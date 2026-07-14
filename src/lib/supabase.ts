import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Enquiry {
  id?: string
  name: string
  phone: string
  email: string
  event_type: string
  event_date: string
  event_time: string
  guest_count: string
  menu_preference: string
  location?: string
  message?: string
  status?: 'new' | 'contacted' | 'confirmed' | 'closed'
  created_at?: string
}