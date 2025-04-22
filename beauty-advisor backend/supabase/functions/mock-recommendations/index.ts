import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// Mock recommendation data
const mockRecommendations = {
  makeup: {
    formal: {
      title: "Elegant Evening Makeup",
      description: "A sophisticated look with defined eyes and a bold lip color that complements your skin tone.",
      items: [
        "Foundation: Medium coverage with a satin finish",
        "Eyes: Smoky eye with champagne and deep brown shades",
        "Lips: Deep berry or classic red lipstick",
        "Cheeks: Subtle rose blush with highlight on cheekbones",
      ],
    },
    casual: {
      title: "Fresh Natural Look",
      description: "A light, everyday makeup that enhances your natural features with a dewy finish.",
      items: [
        "Foundation: Light coverage tinted moisturizer",
        "Eyes: Neutral eyeshadow with mascara",
        "Lips: Tinted lip balm or gloss",
        "Cheeks: Cream blush in a natural flush color",
      ],
    },
    professional: {
      title: "Polished Professional",
      description: "A clean, put-together look that's appropriate for work environments.",
      items: [
        "Foundation: Medium coverage with matte finish",
        "Eyes: Neutral matte eyeshadow with defined lashes",
        "Lips: Nude or soft pink lipstick",
        "Cheeks: Subtle contour and natural blush",
      ],
    },
    party: {
      title: "Vibrant Party Look",
      description: "A fun, eye-catching makeup with shimmer and bold colors.",
      items: [
        "Foundation: Full coverage with luminous finish",
        "Eyes: Metallic or colorful eyeshadow with winged liner",
        "Lips: Bold or glossy lip color",
        "Cheeks: Highlight and bronzer for dimension",
      ],
    },
    date: {
      title: "Romantic Date Night",
      description: "A soft, flattering look with emphasis on glowing skin and romantic colors.",
      items: [
        "Foundation: Medium coverage with radiant finish",
        "Eyes: Soft smoky eye with shimmer",
        "Lips: Rosy pink or mauve lipstick",
        "Cheeks: Warm blush with highlight",
      ],
    },
    other: {
      title: "Versatile Custom Look",
      description: "A balanced makeup that can be adapted to various occasions.",
      items: [
        "Foundation: Your preferred coverage level",
        "Eyes: Neutral base with option to intensify",
        "Lips: MLBB (My Lips But Better) shade",
        "Cheeks: Natural blush and subtle contour",
      ],
    },
  },
  hair: {
    formal: {
      title: "Elegant Updo",
      description: "A sophisticated hairstyle that keeps hair away from the face and showcases your features.",
      items: [
        "Classic chignon or French twist",
        "Sleek side-swept updo",
        "Braided crown with loose tendrils",
        "Volume at the crown for added elegance",
      ],
    },
    casual: {
      title: "Effortless Waves",
      description: "A relaxed, natural-looking style that's easy to maintain throughout the day.",
      items: [
        "Loose beach waves",
        "Textured low ponytail",
        "Half-up style with soft volume",
        "Natural air-dried look with styling cream",
      ],
    },
    professional: {
      title: "Polished Professional Style",
      description: "A neat, put-together hairstyle that conveys competence and attention to detail.",
      items: [
        "Sleek low bun or ponytail",
        "Smooth blowout with subtle bend",
        "Side part with tucked sides",
        "Neat bob with minimal volume",
      ],
    },
    party: {
      title: "Statement Party Hair",
      description: "A bold, eye-catching style that's perfect for celebrations and special events.",
      items: [
        "Voluminous curls or waves",
        "High ponytail with extra length or texture",
        "Half-up style with dramatic volume",
        "Sleek straight hair with shine",
      ],
    },
    date: {
      title: "Romantic Soft Style",
      description: "A feminine, touchable hairstyle that frames your face beautifully.",
      items: [
        "Soft cascading waves",
        "Side-swept style with volume",
        "Loose romantic updo with face-framing pieces",
        "Bouncy blowout with movement",
      ],
    },
    other: {
      title: "Versatile Adaptable Style",
      description: "A balanced hairstyle that can work for multiple settings.",
      items: [
        "Classic blowout with medium volume",
        "Low ponytail or bun with texture",
        "Half-up half-down style",
        "Natural texture enhanced with styling products",
      ],
    },
  },
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
    const { sessionId, eventType, userId } = await req.json()

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

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Get mock recommendations based on event type
    const makeup = mockRecommendations.makeup[eventType] || mockRecommendations.makeup.other
    const hair = mockRecommendations.hair[eventType] || mockRecommendations.hair.other

    // Store recommendations in database
    const { data: recData, error: recError } = await supabase
      .from("recommendations")
      .insert({
        session_id: sessionId,
        makeup_recommendations: makeup,
        hair_recommendations: hair,
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
          makeup,
          hair,
        },
      }),
      { headers },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers })
  }
})

