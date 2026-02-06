import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// আপনার প্রজেক্টের সঠিক URL এবং আপনার দেওয়া Anon Public Key এখানে সেট করা হয়েছে
const supabaseUrl = 'https://wuuspreptqyqzvudtdvq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1dXNwcmVwdHF5cXp2dWR0ZHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzODMwNzksImV4cCI6MjA4NTk1OTA3OX0.kKyGaRAmTMDOrFoB3XSqmMv-xtocFNlh5S8HkVe95qA'

export const supabase = createClient(supabaseUrl, supabaseKey)
