import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Content-Type": "application/json",
  }

  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers })
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get("Authorization")
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Authorization header is required" }), { status: 401, headers })
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || ""
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") || ""
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    })

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers })
    }

    // Get profile update data
    const { name, username, age, gender } = await req.json()

    // Validate data
    if (!name || !username || !age || !gender) {
      return new Response(JSON.stringify({ error: "Name, username, age, and gender are required" }), {
        status: 400,
        headers,
      })
    }

    // Check if username is already taken (if it's different from current username)
    const { data: currentProfile, error: profileError } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single()

    if (profileError) {
      throw profileError
    }

    if (currentProfile && currentProfile.username !== username) {
      const { data: existingUser, error: usernameError } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .single()

      if (existingUser) {
        return new Response(JSON.stringify({ error: "Username is already taken" }), { status: 400, headers })
      }
    }

    // Update profile
    const { data, error } = await supabase
      .from("profiles")
      .update({
        name,
        username,
        age,
        gender,
      })
      .eq("id", user.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ success: true, profile: data }), { headers })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers })
  }
})

