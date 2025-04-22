import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// Face analysis API configuration
const FACE_API_KEY = Deno.env.get("FACE_API_KEY") || ""
const FACE_API_URL = "https://api.example.com/face-analysis" // Replace with actual API

interface FaceAnalysisResult {
  faceShape: string
  skinTone: string
  eyeColor: string
  hairColor: string
  features: {
    eyes: string
    lips: string
    cheekbones: string
  }
  confidence: number
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
    const { photoUrl, userId } = await req.json()

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || ""
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Validate request
    if (!photoUrl) {
      return new Response(JSON.stringify({ error: "Photo URL is required" }), { status: 400, headers })
    }

    // Call face analysis API
    const response = await fetch(FACE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${FACE_API_KEY}`,
      },
      body: JSON.stringify({ imageUrl: photoUrl }),
    })

    if (!response.ok) {
      throw new Error(`Face API error: ${response.statusText}`)
    }

    const analysisResult: FaceAnalysisResult = await response.json()

    // Store analysis result in database
    const { data, error } = await supabase
      .from("profiles")
      .update({
        preferences: {
          faceAnalysis: analysisResult,
        },
      })
      .eq("id", userId)

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ success: true, result: analysisResult }), { headers })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers })
  }
})

