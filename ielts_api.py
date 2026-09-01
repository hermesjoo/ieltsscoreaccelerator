#!/usr/bin/env python3
"""ielts_api.py — IELTS Score Accelerator backend API (test phase).

Runs on :8878. Everything is behind CORS for the GH-Pages origin + local.
Test endpoints for phase A/B: health, site-config, contact form.
Real auth stays in Supabase (frontend). Admin writes go through the
admin gate (password) later phases.

Env:
  IELTS_ADMIN_PASS   admin gate password (default: change-me)
"""
import os
import re
import json
import sqlite3
import secrets
from datetime import datetime, timezone
from functools import wraps

from flask import Flask, request, jsonify, g, Response

APP = Flask(__name__)

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
API_BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(API_BASE_DIR, "ielts_api.db")
ADMIN_PASS = os.environ.get("IELTS_ADMIN_PASS", "change-me")

ALLOWED_ORIGINS = {
    "https://hermesjoo.github.io",
    "http://localhost:8877",
    "http://127.0.0.1:8877",
    "http://localhost:8000",
    "null",  # file:// during dev
}


def cors(resp):
    origin = request.headers.get("Origin", "null")
    resp.headers["Access-Control-Allow-Origin"] = origin if origin in ALLOWED_ORIGINS else "null"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    resp.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return resp


@APP.after_request
def _add_cors(resp):
    return cors(resp)


def _preflight():
    if request.method == "OPTIONS":
        return cors(Response("", 204))
    return None


# ---------------------------------------------------------------------------
# DB helper (SQLite for test phase; migrate to Supabase tables later)
# ---------------------------------------------------------------------------
SCHEMA = """
CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS admin_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    payload TEXT,
    created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS packages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level TEXT NOT NULL,               -- A1 | A2 | B1 | B2
    title TEXT NOT NULL,
    description TEXT,
    is_published INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    package_id INTEGER NOT NULL REFERENCES packages(id),
    title TEXT NOT NULL,
    file_path TEXT NOT NULL,           -- relative to MEDIA_DIR
    size_bytes INTEGER,
    is_free_preview INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS video_tokens (
    token TEXT PRIMARY KEY,
    video_id INTEGER NOT NULL REFERENCES videos(id),
    expires_at REAL NOT NULL
);
"""


def db():
    conn = getattr(g, "_db", None)
    if conn is None:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        g._db = conn
    return conn


# ---------------------------------------------------------------------------
# Admin gate
# ---------------------------------------------------------------------------
def require_admin(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth = request.headers.get("Authorization", "")
        expected = "Bearer " + ADMIN_PASS
        if not secrets.compare_digest(auth, expected):
            return jsonify(error="admin auth required"), 401
        return f(*args, **kwargs)
    return wrapper


# ---------------------------------------------------------------------------
# Endpoints — phase A
# ---------------------------------------------------------------------------
@APP.route("/health")
def health():
    return jsonify(ok=True, service="ielts-api", time=datetime.now(timezone.utc).isoformat())


@APP.route("/api/site-config")
def site_config():
    """Public runtime config the frontend reads (single source of truth)."""
    return jsonify({
        "contact": {
            "email": "support@ieltsacc.org",
            "email2": "admin@ieltsacc.org",
            "phone": "+123456789",           # placeholder — user edits later
            "instagram": "https://instagram.com/ieltsscoreaccelerator",
            "linkedin": "https://linkedin.com/company/ieltsscoreaccelerator",
            "facebook": "https://facebook.com/ieltsscoreaccelerator",
            "youtube": "https://youtube.com/@ieltsscoreaccelerator",
        },
        "features": {
            "chat": False,                    # phase H
            "writing_ai": False,              # phase F
            "crypto": False,                  # phase G
            "packages": True,                 # phase B3 — coming soon cards
        },
        "levels": ["A1", "A2", "B1", "B2"],
    })


@APP.route("/api/contact", methods=["POST", "OPTIONS"])
def contact():
    pre = _preflight()
    if pre:
        return pre
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()[:80]
    email = (data.get("email") or "").strip()[:120]
    subject = (data.get("subject") or "").strip()[:140]
    message = (data.get("message") or "").strip()[:4000]
    if not name or not message:
        return jsonify(error="name and message required"), 400
    if email and not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
        return jsonify(error="invalid email"), 400
    db().execute(
        "INSERT INTO contact_messages (name, email, subject, message, created_at) VALUES (?,?,?,?,?)",
        (name, email, subject, message, datetime.now(timezone.utc).isoformat()),
    )
    db().commit()
    return jsonify(ok=True), 201


@APP.route("/api/admin/messages", methods=["GET", "OPTIONS"])
def admin_messages():
    pre = _preflight()
    if pre:
        return pre
    if not secrets.compare_digest(request.headers.get("Authorization",""), "Bearer " + ADMIN_PASS):
        return jsonify(error="admin auth required"), 401
    rows = db().execute(
        "SELECT * FROM contact_messages ORDER BY id DESC LIMIT 200"
    ).fetchall()
    return jsonify([dict(r) for r in rows])


@APP.route("/api/admin/log", methods=["POST", "OPTIONS"])
def admin_log():
    pre = _preflight()
    if pre:
        return pre
    if not secrets.compare_digest(request.headers.get("Authorization",""), "Bearer " + ADMIN_PASS):
        return jsonify(error="admin auth required"), 401
    data = request.get_json(silent=True) or {}
    db().execute(
        "INSERT INTO admin_log (action, payload, created_at) VALUES (?,?,?)",
        ((data.get("action") or "?")[:80], json.dumps(data.get("payload") or {}),
         datetime.now(timezone.utc).isoformat()),
    )
    db().commit()
    return jsonify(ok=True)


# ---------------------------------------------------------------------------
# Phase C — packages, video upload, signed streaming
# ---------------------------------------------------------------------------
MEDIA_DIR = os.path.join(API_BASE_DIR, "media", "videos")
os.makedirs(MEDIA_DIR, exist_ok=True)
ALLOWED_VIDEO_EXT = {".mp4", ".webm", ".m4v"}
TOKEN_TTL = 3600  # 1 hour


@APP.route("/api/packages")
def list_packages():
    rows = db().execute(
        """SELECT p.id, p.level, p.title, p.description, p.is_published,
                  (SELECT COUNT(*) FROM videos v WHERE v.package_id = p.id) AS video_count
           FROM packages p WHERE p.is_published = 1 ORDER BY p.level"""
    ).fetchall()
    out = []
    for r in rows:
        pkg = dict(r)
        vids = db().execute(
            "SELECT id, title, is_free_preview, size_bytes FROM videos WHERE package_id=? ORDER BY id",
            (r["id"],),
        ).fetchall()
        pkg["videos"] = [dict(v) for v in vids]
        out.append(pkg)
    return jsonify(out)


@APP.route("/api/admin/packages", methods=["GET", "POST", "OPTIONS"])
def admin_packages():
    pre = _preflight()
    if pre:
        return pre
    auth = request.headers.get("Authorization", "")
    if not secrets.compare_digest(auth, "Bearer " + ADMIN_PASS):
        return jsonify(error="admin auth required"), 401
    if request.method == "GET":
        rows = db().execute(
            "SELECT * FROM packages ORDER BY level"
        ).fetchall()
        return jsonify([dict(r) for r in rows])
    data = request.get_json(silent=True) or {}
    level = (data.get("level") or "").strip().upper()[:2]
    title = (data.get("title") or "").strip()[:120]
    desc = (data.get("description") or "").strip()[:1000]
    if level not in ("A1", "A2", "B1", "B2") or not title:
        return jsonify(error="level (A1/A2/B1/B2) and title required"), 400
    cur = db().execute(
        "INSERT INTO packages (level, title, description, is_published, created_at) VALUES (?,?,?,1,?)",
        (level, title, desc, datetime.now(timezone.utc).isoformat()),
    )
    db().commit()
    return jsonify(ok=True, id=cur.lastrowid), 201


@APP.route("/api/admin/upload", methods=["POST", "OPTIONS"])
def admin_upload():
    pre = _preflight()
    if pre:
        return pre
    auth = request.headers.get("Authorization", "")
    if not secrets.compare_digest(auth, "Bearer " + ADMIN_PASS):
        return jsonify(error="admin auth required"), 401
    f = request.files.get("file")
    package_id = request.form.get("package_id", type=int)
    title = (request.form.get("title") or "").strip()[:120]
    is_preview = 1 if request.form.get("is_preview") in ("1", "true", "on") else 0
    if not f or not package_id or not title:
        return jsonify(error="file, package_id, title required"), 400
    pkg = db().execute("SELECT id FROM packages WHERE id=?", (package_id,)).fetchone()
    if not pkg:
        return jsonify(error="package not found"), 404
    ext = os.path.splitext(f.filename or "")[1].lower()
    if ext not in ALLOWED_VIDEO_EXT:
        return jsonify(error="only mp4/webm/m4v allowed"), 400
    safe = re.sub(r"[^a-zA-Z0-9_-]", "_", f.filename.rsplit(".", 1)[0])[:60]
    fname = f"pkg{package_id}_{safe}_{secrets.token_hex(4)}{ext}"
    dest = os.path.join(MEDIA_DIR, fname)
    f.save(dest)
    size = os.path.getsize(dest)
    cur = db().execute(
        "INSERT INTO videos (package_id, title, file_path, size_bytes, is_free_preview, created_at) VALUES (?,?,?,?,?,?)",
        (package_id, title, fname, size, is_preview, datetime.now(timezone.utc).isoformat()),
    )
    db().commit()
    return jsonify(ok=True, id=cur.lastrowid, size=size), 201


@APP.route("/api/admin/videos/<int:vid>", methods=["DELETE", "OPTIONS"])
def admin_delete_video(vid):
    pre = _preflight()
    if pre:
        return pre
    if not secrets.compare_digest(request.headers.get("Authorization",""), "Bearer " + ADMIN_PASS):
        return jsonify(error="admin auth required"), 401
    row = db().execute("SELECT file_path FROM videos WHERE id=?", (vid,)).fetchone()
    if not row:
        return jsonify(error="not found"), 404
    path = os.path.join(MEDIA_DIR, row["file_path"])
    if os.path.exists(path):
        os.remove(path)
    db().execute("DELETE FROM videos WHERE id=?", (vid,))
    db().commit()
    return jsonify(ok=True)


@APP.route("/api/video-token", methods=["POST", "OPTIONS"])
def video_token():
    """Issue a short-lived signed token for a video. Free previews: open.
       Full videos: require Supabase JWT (verified cheaply here) + later entitlement."""
    pre = _preflight()
    if pre:
        return pre
    data = request.get_json(silent=True) or {}
    vid = data.get("video_id")
    auth = request.headers.get("Authorization", "")
    row = db().execute("SELECT id, is_free_preview FROM videos WHERE id=?", (vid,)).fetchone()
    if not row:
        return jsonify(error="video not found"), 404
    if not row["is_free_preview"]:
        # paid video: require *some* auth for now (Supabase access token present).
        # Full entitlement check (orders/packages) lands in phase G.
        if not auth.startswith("Bearer ") and not data.get("sb_token"):
            return jsonify(error="login required for this video"), 401
    token = secrets.token_urlsafe(32)
    expires = datetime.now(timezone.utc).timestamp() + TOKEN_TTL
    db().execute("INSERT INTO video_tokens (token, video_id, expires_at) VALUES (?,?,?)", (token, vid, expires))
    db().commit()
    return jsonify(token=token, expires_in=TOKEN_TTL, video_id=vid)


@APP.route("/api/video-file", methods=["POST", "OPTIONS"])
def video_file():
    """Resolve a valid token to its filename (so the player can build the stream URL)."""
    pre = _preflight()
    if pre:
        return pre
    data = request.get_json(silent=True) or {}
    token, vid = data.get("token"), data.get("video_id")
    row = db().execute(
        "SELECT v.file_path FROM video_tokens t JOIN videos v ON v.id = t.video_id "
        "WHERE t.token=? AND t.video_id=? AND t.expires_at > ?",
        (token, vid, datetime.now(timezone.utc).timestamp()),
    ).fetchone()
    if not row:
        return jsonify(error="invalid token"), 403
    return jsonify(file=row["file_path"])


@APP.route("/media/videos/<path:fname>")
def stream_video(fname):
    """Serve video only with a valid unexpired token. Supports Range (seeking)."""
    token = request.args.get("t", "")
    row = db().execute(
        "SELECT video_id, expires_at FROM video_tokens WHERE token=?", (token,)
    ).fetchone()
    if not row or row["expires_at"] < datetime.now(timezone.utc).timestamp():
        return jsonify(error="invalid or expired token"), 403
    v = db().execute("SELECT file_path FROM videos WHERE id=?", (row["video_id"],)).fetchone()
    if not v or v["file_path"] != fname:
        return jsonify(error="token/video mismatch"), 403
    path = os.path.join(MEDIA_DIR, fname)
    if not os.path.exists(path):
        return jsonify(error="file missing"), 404
    size = os.path.getsize(path)
    range_header = request.headers.get("Range")
    if range_header:
        m = re.match(r"bytes=(\d+)-(\d*)", range_header)
        start = int(m.group(1)) if m else 0
        end = int(m.group(2)) if m and m.group(2) else min(start + 4 * 1024 * 1024, size - 1)
        end = min(end, size - 1)
        with open(path, "rb") as fh:
            fh.seek(start)
            chunk = fh.read(end - start + 1)
        resp = Response(chunk, 206, mimetype="video/mp4")
        resp.headers["Content-Range"] = f"bytes {start}-{end}/{size}"
        resp.headers["Accept-Ranges"] = "bytes"
        resp.headers["Content-Length"] = str(len(chunk))
        return resp
    resp = Response(open(path, "rb").read(), 200, mimetype="video/mp4")
    resp.headers["Accept-Ranges"] = "bytes"
    resp.headers["Content-Length"] = str(size)
    return resp


@APP.route("/api/progress", methods=["POST", "OPTIONS"])
def save_progress():
    pre = _preflight()
    if pre:
        return pre
    data = request.get_json(silent=True) or {}
    email = (data.get("user_email") or "guest").strip()[:120]
    name = (data.get("user_name") or "Guest").strip()[:80]
    typ = (data.get("type") or "?").strip()[:20]
    if typ not in ("reading", "listening", "writing", "speaking", "vocab",
                   "grammar", "placement", "mock"):
        return jsonify(error="bad type"), 400
    with sqlite3.connect(DB_PATH) as c:
        c.execute(
            "CREATE TABLE IF NOT EXISTS progress_events (id INTEGER PRIMARY KEY AUTOINCREMENT, "
            "user_email TEXT, user_name TEXT, type TEXT, label TEXT, score INTEGER, "
            "band REAL, level TEXT, created_at TEXT NOT NULL)"
        )
        c.execute(
            "INSERT INTO progress_events (user_email, user_name, type, label, score, band, level, created_at) "
            "VALUES (?,?,?,?,?,?,?,?)",
            (email, name, typ, (data.get("label") or "")[:120],
             data.get("score"), data.get("band"), data.get("level"),
             datetime.now(timezone.utc).isoformat()),
        )
    return jsonify(ok=True), 201


@APP.route("/api/admin/progress", methods=["GET", "OPTIONS"])
def admin_progress():
    pre = _preflight()
    if pre:
        return pre
    if not secrets.compare_digest(request.headers.get("Authorization", ""), "Bearer " + ADMIN_PASS):
        return jsonify(error="admin auth required"), 401
    with sqlite3.connect(DB_PATH) as c:
        c.row_factory = sqlite3.Row
        rows = c.execute(
            "SELECT * FROM progress_events ORDER BY id DESC LIMIT 500"
        ).fetchall()
    # aggregates
    by_user = {}
    by_type = {}
    for r in rows:
        d = dict(r)
        u = by_user.setdefault(d["user_email"], {"name": d["user_name"], "events": 0, "avg": None, "types": {}})
        u["events"] += 1
        u["types"][d["type"]] = u["types"].get(d["type"], 0) + 1
        by_type[d["type"]] = by_type.get(d["type"], 0) + 1
    scored = [dict(r) for r in rows if r["score"] is not None]
    for email, u in by_user.items():
        rel = [r for r in scored if r["user_email"] == email]
        if rel:
            u["avg"] = round(sum(r["score"] for r in rel) / len(rel))
    return jsonify({"recent": [dict(r) for r in rows[:100]], "by_user": by_user, "by_type": by_type})


if __name__ == "__main__":
    with sqlite3.connect(DB_PATH) as c:
        c.executescript(SCHEMA)
    APP.run(host="127.0.0.1", port=8878, debug=False)
