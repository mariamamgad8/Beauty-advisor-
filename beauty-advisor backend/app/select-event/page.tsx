"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase-client"
import { Loader2 } from "lucide-react"

const eventTypes = [
  {
    id: "formal",
    name: "Formal Event",
    description: "Weddings, galas, black-tie events",
    icon: "🎭",
  },
  {
    id: "casual",
    name: "Casual Outing",
    description: "Day-to-day activities, coffee dates, shopping",
    icon: "☕",
  },
  {
    id: "professional",
    name: "Professional Setting",
    description: "Job interviews, work meetings, conferences",
    icon: "💼",
  },
  {
    id: "party",
    name: "Party",
    description: "Birthdays, nightclubs, celebrations",
    icon: "🎉",
  },
  {
    id: "date",
    name: "Romantic Date",
    description: "Dinner dates, special occasions with partner",
    icon: "❤️",
  },
  {
    id: "other",
    name: "Other",
    description: "Custom event or occasion",
    icon: "✨",
  },
]

export default function SelectEvent() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push("/login")
      } else {
        setUser(data.user)
      }
    }

    checkUser()
  }, [router])

  const handleEventSelect = (eventId: string) => {
    setSelectedEvent(eventId)
  }

  const handleContinue = async () => {
    if (!selectedEvent || !user) return

    try {
      setLoading(true)
      const supabase = createClient()

      // Create a new recommendation session
      const { error } = await supabase.from("recommendation_sessions").insert([
        {
          user_id: user.id,
          event_type: selectedEvent,
          status: "processing",
        },
      ])

      if (error) throw error

      // Redirect to recommendations page
      router.push("/recommendations")
    } catch (err: any) {
      console.error("Error saving event selection:", err)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-pink-800">What are you getting ready for?</h2>
          <p className="mt-2 text-gray-600">
            Select the type of event to get personalized makeup and hairstyle recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {eventTypes.map((event) => (
            <Card
              key={event.id}
              className={`cursor-pointer transition-all ${
                selectedEvent === event.id
                  ? "border-pink-500 ring-2 ring-pink-500 shadow-md"
                  : "border-gray-200 hover:border-pink-300"
              }`}
              onClick={() => handleEventSelect(event.id)}
            >
              <CardContent className="p-6 flex items-center">
                <div className="text-4xl mr-4">{event.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg text-pink-800">{event.name}</h3>
                  <p className="text-sm text-gray-500">{event.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedEvent || loading}
            className="bg-pink-600 hover:bg-pink-700 text-white rounded-full py-2 px-8"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Get Recommendations"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

