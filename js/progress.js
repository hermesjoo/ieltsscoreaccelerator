/* progress.js — central learning-analytics hub (phase E).
   Records every test/exercise result into localStorage with a shape the dashboard
   and admin panel both read. Works for logged-in AND guest users (local first,
   Supabase sync hook included for later). */

(function () {
  var KEY_HISTORY = 'ielts_history';   // array of result records
  var KEY_STATS   = 'ielts_stats';     // derived aggregates (legacy keys kept)
  var KEY_ACT     = 'ielts_activity';  // activity feed
  var KEY_PROG    = 'ielts_progress';  // per-skill %

  function today() { return new Date().toISOString().slice(0, 10); }

  function read(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }
  function write(k, v) { localStorage.setItem(k, JSON.stringify(v)); }

  /**
   * record(result) — call from every quiz/exercise finish.
   * result: {type: 'reading'|'listening'|'writing'|'speaking'|'vocab'|'grammar'|'placement'|'mock',
   *          score: 0-100 (pct) | null, band: number|null, level: 'A1'..'B2'|null,
   *          label: 'Passage 3' | 'Mock Test' | ..., detail: optional object}
   */
  function record(result) {
    if (!result || !result.type) return;
    result.date = today();
    result.ts = Date.now();

    var hist = read(KEY_HISTORY, []);
    hist.push(result);
    // cap at 500 records
    if (hist.length > 500) hist = hist.slice(-500);
    write(KEY_HISTORY, hist);

    // activity feed
    var act = read(KEY_ACT, []);
    act.push({
      text: actText(result),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: result.date, done: true,
    });
    if (act.length > 60) act = act.slice(-60);
    write(KEY_ACT, act);

    recompute();
    pushToServer(result);
  }

  function actText(r) {
    var score = (r.score !== null && r.score !== undefined) ? ' — ' + r.score + '%' : '';
    var band = r.band ? ' · band ' + r.band : '';
    var lvl = r.level ? ' · level ' + r.level : '';
    var names = {
      reading: '📖 Reading', listening: '🎧 Listening', writing: '✍️ Writing',
      speaking: '🗣️ Speaking', vocab: '📚 Vocabulary', grammar: '🔤 Grammar',
      placement: '🎯 Placement', mock: '📝 Mock Test',
    };
    return (names[r.type] || r.type) + (r.label ? ': ' + r.label : '') + score + band + lvl;
  }

  function recompute() {
    var hist = read(KEY_HISTORY, []);
    var stats = {
      totalTests: hist.length,
      studyHours: Math.round(hist.length * 0.35 * 10) / 10, // ~21 min avg per exercise
      avgScore: null,
      streak: calcStreak(hist),
    };
    var scored = hist.filter(function (h) { return typeof h.score === 'number'; });
    if (scored.length) {
      stats.avgScore = Math.round(scored.reduce(function (a, h) { return a + h.score; }, 0) / scored.length);
    }
    // skill progress: average score per skill, capped 100
    var prog = {};
    ['reading', 'listening', 'writing', 'speaking'].forEach(function (s) {
      var rel = scored.filter(function (h) { return h.type === s; });
      prog[s] = rel.length ? Math.round(rel.reduce(function (a, h) { return a + h.score; }, 0) / rel.length) : 0;
    });
    write(KEY_STATS, stats);
    write(KEY_PROG, prog);
  }

  function calcStreak(hist) {
    if (!hist.length) return 0;
    var days = {};
    hist.forEach(function (h) { days[h.date] = 1; });
    var streak = 0;
    var d = new Date();
    // allow "yesterday-only" streak to still show
    if (!days[d.toISOString().slice(0, 10)]) d.setDate(d.getDate() - 1);
    while (days[d.toISOString().slice(0, 10)]) {
      streak++;
      d.setDate(d.getDate() - 1);
    }
    return streak;
  }

  // ---- optional server sync (API ready; silent no-op if unreachable) ----
  function pushToServer(rec) {
    if (!window.SITE || !SITE.apiBase) return;
    try {
      var user = JSON.parse(localStorage.getItem('user') || 'null');
      fetch(SITE.apiBase + '/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: user && user.email ? user.email : 'guest',
          user_name: user && user.name ? user.name : 'Guest',
          type: rec.type, label: rec.label || '',
          score: rec.score, band: rec.band, level: rec.level,
          detail: rec.detail || {},
        }),
      }).catch(function () {});
    } catch (e) {}
  }

  // expose
  window.PROGRESS = { record: record, recompute: recompute, history: function () { return read(KEY_HISTORY, []); } };
})();
