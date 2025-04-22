import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// Recommendation engine configuration
const RECOMMENDATION_API_KEY = Deno.env.get("RECOMMENDATION_API_KEY") || ""
const RECOMMENDATION_API_URL = "https://api.example.com/beauty-recommendations" // Replace with actual API

interface RecommendationRequest {
  sessionId: string
  eventType: string
  userId: string
}

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
    const { sessionId, eventType, userId }: RecommendationRequest = await req.json()

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || ""
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Validate request
    if (!sessionId || !eventType || !userId) {
      return new Response(JSON.stringify({ error: "Session ID, event type, and user ID are required" }), {
        status: 400,
        headers,
      })
    }

    // Get user profile and face analysis data
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("preferences, gender, age")
      .eq("id", userId)
      .single()

    if (profileError) {
      throw profileError
    }

    const faceAnalysis = profileData.preferences?.faceAnalysis || {}

    // Get user's primary photo
    const { data: photoData, error: photoError } = await supabase
      .from("photos")
      .select("public_url")
      .eq("user_id", userId)
      .eq("is_primary", true)
      .single()

    if (photoError && photoError.code !== "PGRST116") {
      // PGRST116 is "no rows returned"
      throw photoError
    }

    const photoUrl = photoData?.public_url || ""

    // Call recommendation API
    const response = await fetch(RECOMMENDATION_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RECOMMENDATION_API_KEY}`,
      },
      body: JSON.stringify({
        eventType,
        faceAnalysis,
        gender: profileData.gender,
        age: profileData.age,
        photoUrl,
      }),
    })

    if (!response.ok) {
      throw new Error(`Recommendation API error: ${response.statusText}`)
    }

    const recommendationResult = await response.json()

    // Store recommendations in database
    const { data: recData, error: recError } = await supabase
      .from("recommendations")
      .insert({
        session_id: sessionId,
        makeup_recommendations: recommendationResult.makeup,
        hair_recommendations: recommendationResult.hair,
      })
      .select()
      .single()

    if (recError) {
      throw recError
    }

    return new Response(
      JSON.stringify({
        success: true,
        recommendations: {
          makeup: recommendationResult.makeup,
          hair: recommendationResult.hair,
        },
      }),
      { headers },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers })
  }
})

