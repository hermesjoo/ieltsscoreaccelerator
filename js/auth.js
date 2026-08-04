// auth.js — Supabase auth helper (non-module, loaded via <script> tag)

const SUPABASE_URL = 'https://nuvrlzxwijjwjycgmsrc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_W5eqkzt1JBFCEZLOayOcBA_Fg8HAmsR';
const REDIRECT_TO = 'https://hermesjoo.github.io/ieltsscoreaccelerator/pages/dashboard.html';

// Initialize Supabase client (expects @supabase/supabase-js loaded via CDN)
let supabase = null;

function initSupabase() {
  if (supabase) return supabase;
  if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    return supabase;
  }
  console.error('Supabase JS library not loaded. Ensure the CDN script tag is present.');
  return null;
}

// Google Sign-In
async function signInWithGoogle() {
  const client = initSupabase();
  if (!client) {
    throw new Error('Supabase client not initialized. Please refresh the page.');
  }
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: REDIRECT_TO
    }
  });
  if (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
  return data;
}

// Email Sign-Up
async function signUp(email, password, name) {
  const client = initSupabase();
  if (!client) {
    throw new Error('Supabase client not initialized. Please refresh the page.');
  }
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: { data: { display_name: name } }
  });
  if (error) throw error;
  return data;
}

// Email Login
async function signIn(email, password) {
  const client = initSupabase();
  if (!client) {
    throw new Error('Supabase client not initialized. Please refresh the page.');
  }
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// Sign Out
async function signOut() {
  const client = initSupabase();
  if (!client) {
    throw new Error('Supabase client not initialized. Please refresh the page.');
  }
  await client.auth.signOut();
  localStorage.removeItem('user');
}

// Get current user
async function getUser() {
  const client = initSupabase();
  if (!client) {
    const local = localStorage.getItem('user');
    return local ? JSON.parse(local) : null;
  }
  const { data: { user } } = await client.auth.getUser();
  if (user) {
    const userData = {
      uid: user.id,
      name: user.user_metadata?.display_name || user.email?.split('@')[0] || 'Student',
      email: user.email,
      photo: user.user_metadata?.avatar_url || null
    };
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  }
  const local = localStorage.getItem('user');
  return local ? JSON.parse(local) : null;
}

// Listen for auth changes
function setupAuthListener() {
  const client = initSupabase();
  if (!client) return;
  client.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      const user = session.user;
      localStorage.setItem('user', JSON.stringify({
        uid: user.id,
        name: user.user_metadata?.display_name || user.email?.split('@')[0] || 'Student',
        email: user.email,
        photo: user.user_metadata?.avatar_url || null
      }));
    }
  });
}

// Expose globally
window.signInWithGoogle = signInWithGoogle;
window.signUp = signUp;
window.signIn = signIn;
window.signOut = signOut;
window.getUser = getUser;

// Auto-initialize when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupAuthListener);
} else {
  setupAuthListener();
}
