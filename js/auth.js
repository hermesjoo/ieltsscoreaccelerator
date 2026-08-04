import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://nuvrlzxwijjwjycgmsrc.supabase.co'
const supabaseKey = 'sb_publishable_W5eqkzt1JBFCEZLOayOcBA_Fg8HAmsR'

const supabase = createClient(supabaseUrl, supabaseKey)

// Google Sign-In
async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/ieltsscoreaccelerator/pages/dashboard.html'
    }
  })
  if (error) console.error('Google sign in error:', error)
}

// Email Sign-Up
async function signUp(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: name } }
  })
  if (error) throw error
  return data
}

// Email Login
async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

// Sign Out
async function signOut() {
  await supabase.auth.signOut()
  localStorage.removeItem('user')
}

// Get current user
async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const userData = {
      uid: user.id,
      name: user.user_metadata?.display_name || user.email?.split('@')[0] || 'Student',
      email: user.email,
      photo: user.user_metadata?.avatar_url || null
    }
    localStorage.setItem('user', JSON.stringify(userData))
    return userData
  }
  const local = localStorage.getItem('user')
  return local ? JSON.parse(local) : null
}

// Listen for auth changes
supabase.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    const user = session.user
    localStorage.setItem('user', JSON.stringify({
      uid: user.id,
      name: user.user_metadata?.display_name || user.email?.split('@')[0] || 'Student',
      email: user.email,
      photo: user.user_metadata?.avatar_url || null
    }))
  }
})

export { signInWithGoogle, signUp, signIn, signOut, getUser }
