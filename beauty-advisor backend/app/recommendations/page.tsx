"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase-client"
import { Loader2, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function Recommendations() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submittingFeedback, setSubmittingFeedback] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [recommendations, setRecommendations] = useState<any>(null)
  const [feedback, setFeedback] = useState({
    rating: null as "positive" | "negative" | null,
    comment: "",
  })

  useEffect(() => {
    const checkUserAndLoadData = async () => {
      try {
        setLoading(true)
        const supabase = createClient()

        // Get current user
        const { data: userData } = await supabase.auth.getUser()
        if (!userData.user) {
          return router.push("/login")
        }

        setUser(userData.user)

        // Get user profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userData.user.id)
          .single()

        if (profileError) throw profileError
        setProfile(profileData)

        // Get latest recommendation session
        const { data: sessionData, error: sessionError } = await supabase
          .from("recommendation_sessions")
          .select("*")
          .eq("user_id", userData.user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single()

        if (sessionError) throw sessionError
        setSession(sessionData)

        // For mock client, get recommendations directly
        if ((supabase as any).getRecommendations) {
          const mockRecommendations = (supabase as any).getRecommendations(sessionData.event_type)
          setRecommendations(mockRecommendations)
          setLoading(false)

          // Update session status to completed
          supabase.from("recommendation_sessions").update({ status: "completed" }).eq("id", sessionData.id)
        } else {
          // In a real app, you would call your AI model here
          setTimeout(() => {
            // This is a fallback in case the mock client doesn't have getRecommendations
            const mockRecommendations = generateMockRecommendations(profileData, sessionData.event_type)
            setRecommendations(mockRecommendations)
            setLoading(false)

            // Update session status to completed
            supabase.from("recommendation_sessions").update({ status: "completed" }).eq("id", sessionData.id)
          }, 2000)
        }
      } catch (err) {
        console.error("Error loading recommendations:", err)
        setLoading(false)
      }
    }

    checkUserAndLoadData()
  }, [router])

  const generateMockRecommendations = (profile: any, eventType: string) => {
    // This would be replaced with actual AI model output
    const makeupStyles = {
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
    }

    const hairstyles = {
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
    }

    return {
      makeup: makeupStyles[eventType as keyof typeof makeupStyles] || makeupStyles.other,
      hair: hairstyles[eventType as keyof typeof hairstyles] || hairstyles.other,
    }
  }

  const handleFeedbackRating = (rating: "positive" | "negative") => {
    setFeedback((prev) => ({ ...prev, rating }))
  }

  const handleFeedbackComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback((prev) => ({ ...prev, comment: e.target.value }))
  }

  const submitFeedback = async () => {
    if (!feedback.rating || !session) return

    try {
      setSubmittingFeedback(true)
      const supabase = createClient()

      const { error } = await supabase.from("feedback").insert([
        {
          session_id: session.id,
          user_id: user.id,
          rating: feedback.rating,
          comment: feedback.comment,
        },
      ])

      if (error) throw error

      // Show success message
      alert("Thank you for your feedback!")

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      console.error("Error submitting feedback:", err)
    } finally {
      setSubmittingFeedback(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col items-center justify-center p-4">
        <Loader2 className="h-12 w-12 animate-spin text-pink-600 mb-4" />
        <h2 className="text-xl font-medium text-pink-800">Generating your personalized recommendations...</h2>
        <p className="text-gray-600 mt-2 text-center">
          Our AI is analyzing your photo and creating the perfect look for your event
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-pink-800">Your Personalized Recommendations</h2>
          <p className="mt-2 text-gray-600">Based on your photo and {session?.event_type} event</p>
        </div>

        {recommendations && (
          <Tabs defaultValue="makeup" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="makeup">Makeup Recommendations</TabsTrigger>
              <TabsTrigger value="hair">Hairstyle Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="makeup">
              <Card className="border-pink-200 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-pink-800 mb-2">{recommendations.makeup.title}</h3>
                  <p className="text-gray-600 mb-6">{recommendations.makeup.description}</p>

                  <div className="bg-pink-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-pink-800 mb-2">Recommended Products & Techniques:</h4>
                    <ul className="space-y-2">
                      {recommendations.makeup.items.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-pink-500 mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Pro Tips:</h4>
                    <p className="text-gray-700">
                      For your skin tone and features, focus on blending well around the eyes and use a setting spray to
                      ensure your makeup lasts throughout the event.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hair">
              <Card className="border-pink-200 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-pink-800 mb-2">{recommendations.hair.title}</h3>
                  <p className="text-gray-600 mb-6">{recommendations.hair.description}</p>

                  <div className="bg-pink-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-pink-800 mb-2">Recommended Styles:</h4>
                    <ul className="space-y-2">
                      {recommendations.hair.items.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-pink-500 mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Pro Tips:</h4>
                    <p className="text-gray-700">
                      For your hair texture and length, prep with a heat protectant before styling and finish with a
                      light-hold hairspray to maintain the look without stiffness.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Feedback Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold text-pink-800 mb-4">How do you like these recommendations?</h3>

          <div className="flex space-x-4 mb-6">
            <Button
              variant={feedback.rating === "positive" ? "default" : "outline"}
              className={feedback.rating === "positive" ? "bg-green-600 hover:bg-green-700" : ""}
              onClick={() => handleFeedbackRating("positive")}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Love it!
            </Button>

            <Button
              variant={feedback.rating === "negative" ? "default" : "outline"}
              className={feedback.rating === "negative" ? "bg-red-600 hover:bg-red-700" : ""}
              onClick={() => handleFeedbackRating("negative")}
            >
              <ThumbsDown className="mr-2 h-4 w-4" />
              Not for me
            </Button>
          </div>

          <div className="mb-6">
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
              Additional comments (optional)
            </label>
            <Textarea
              id="feedback"
              placeholder="Tell us more about what you think..."
              value={feedback.comment}
              onChange={handleFeedbackComment}
              className="min-h-[100px]"
            />
          </div>

          <Button
            onClick={submitFeedback}
            disabled={!feedback.rating || submittingFeedback}
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            {submittingFeedback ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit Feedback
              </>
            )}
          </Button>
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard")}
            className="border-pink-600 text-pink-600 hover:bg-pink-50"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

