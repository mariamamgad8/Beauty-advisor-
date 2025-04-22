import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { createMockClient } from "./mock-supabase"

// Flag to toggle between real Supabase client and mock client
const USE_MOCK_CLIENT = true

// Create a single supabase client for interacting with your database
export const createClient = () => {
  if (USE_MOCK_CLIENT) {
    console.log("Using mock Supabase client for UI/UX testing")
    return createMockClient()
  }

  // In a real app, these would be environment variables
  const supabaseUrl = "https://your-project-url.supabase.co"
  const supabaseAnonKey = "your-anon-key"

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

