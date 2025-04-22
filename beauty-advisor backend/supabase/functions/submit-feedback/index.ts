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

    // Get feedback data
    const { sessionId, rating, comment } = await req.json()

    // Validate data
    if (!sessionId || !rating) {
      return new Response(JSON.stringify({ error: "Session ID and rating are required" }), { status: 400, headers })
    }

    // Verify the session belongs to the user
    const { data: session, error: sessionError } = await supabase
      .from("recommendation_sessions")
      .select("id")
      .eq("id", sessionId)
      .eq("user_id", user.id)
      .single()

    if (sessionError || !session) {
      return new Response(JSON.stringify({ error: "Invalid session ID or session does not belong to user" }), {
        status: 400,
        headers,
      })
    }

    // Submit feedback
    const { data, error } = await supabase
      .from("feedback")
      .insert({
        session_id: sessionId,
        user_id: user.id,
        rating,
        comment,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    // Send analytics event (in a real app, you would integrate with an analytics service)
    console.log("Feedback submitted:", {
      userId: user.id,
      sessionId,
      rating,
      hasComment: !!comment,
    })

    return new Response(JSON.stringify({ success: true, feedback: data }), { headers })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers })
  }
})

