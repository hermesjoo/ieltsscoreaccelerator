// auth.js — Supabase auth helper
var SUPABASE_URL = 'https://nuvrlzxwijjwjycgmsrc.supabase.co';
var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dnJsenh3aWpqd2p5Y2dtc3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NzE5MTMsImV4cCI6MjEwMTQ0NzkxM30.DPpd4SR2aqSS14elDFr6kvnbuwrJkfbpPJrYIeB3McE';
var REDIRECT_TO = 'https://hermesjoo.github.io/ieltsscoreaccelerator/pages/dashboard.html';
var _supabaseClient = null;

function _initSupabase() {
  if (_supabaseClient) return _supabaseClient;
  if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    _supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    return _supabaseClient;
  }
  return null;
}

window.signInWithGoogle = function() {
  var client = _initSupabase();
  if (!client) throw new Error('Supabase not loaded. Refresh the page.');
  return client.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: REDIRECT_TO }
  });
};

window.signUp = function(email, password, name) {
  var client = _initSupabase();
  if (!client) throw new Error('Supabase not loaded. Refresh the page.');
  return client.auth.signUp({
    email: email,
    password: password,
    options: { data: { display_name: name } }
  });
};

window.signIn = function(email, password) {
  var client = _initSupabase();
  if (!client) throw new Error('Supabase not loaded. Refresh the page.');
  return client.auth.signInWithPassword({ email: email, password: password });
};

window.signOut = function() {
  var client = _initSupabase();
  if (!client) return Promise.resolve();
  return client.auth.signOut().then(function() { localStorage.removeItem('user'); });
};

window.getUser = function() {
  var client = _initSupabase();
  if (!client) {
    var local = localStorage.getItem('user');
    return Promise.resolve(local ? JSON.parse(local) : null);
  }
  return client.auth.getUser().then(function(result) {
    var user = result.data && result.data.user;
    if (user) {
      var userData = {
        uid: user.id,
        name: (user.user_metadata && user.user_metadata.display_name) || (user.email ? user.email.split('@')[0] : 'Student'),
        email: user.email,
        photo: user.user_metadata && user.user_metadata.avatar_url
      };
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    }
    var local = localStorage.getItem('user');
    return local ? JSON.parse(local) : null;
  });
};
