import { createClient } from '@supabase/supabase-js'

// Public Supabase config. The publishable (anon) key is designed to be exposed
// in the browser — it only grants what Row Level Security permits. It is
// hardcoded here so the app never depends on a build-time env var (a misconfigured
// Cloudflare variable previously shipped the *secret* key to the browser).
// NEVER put a secret key (sb_secret_… / service_role) in this file.
export const SUPABASE_URL = 'https://vgkekcnalewgdezrbxhq.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_wjMtBgv-LS9Zi32IiZLVLg_Vi7pWxFT'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
