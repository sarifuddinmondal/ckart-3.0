import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Supabase Dashboard theke ei URL ebong Key ti nishchit hoye bosiye din
const supabaseUrl = 'https://wuuspreptqyqzvudtdvq.supabase.co'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY' // Ekhane apnar Anon Key-ti bosiye din

export const supabase = createClient(supabaseUrl, supabaseKey)
