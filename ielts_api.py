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
@require_admin
def admin_messages():
    pre = _preflight()
    if pre:
        return pre
    rows = db().execute(
        "SELECT * FROM contact_messages ORDER BY id DESC LIMIT 200"
    ).fetchall()
    return jsonify([dict(r) for r in rows])


@APP.route("/api/admin/log", methods=["POST", "OPTIONS"])
@require_admin
def admin_log():
    pre = _preflight()
    if pre:
        return pre
    data = request.get_json(silent=True) or {}
    db().execute(
        "INSERT INTO admin_log (action, payload, created_at) VALUES (?,?,?)",
        ((data.get("action") or "?")[:80], json.dumps(data.get("payload") or {}),
         datetime.now(timezone.utc).isoformat()),
    )
    db().commit()
    return jsonify(ok=True)


if __name__ == "__main__":
    with sqlite3.connect(DB_PATH) as c:
        c.executescript(SCHEMA)
    APP.run(host="127.0.0.1", port=8878, debug=False)
