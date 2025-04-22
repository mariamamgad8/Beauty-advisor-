import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "./database.types"

// Create a Supabase client for client components
export const createClient = () => {
  return createClientComponentClient<Database>()
}

// Upload a photo to Supabase storage
export async function uploadPhoto(file: File, userId: string) {
  const supabase = createClient()

  // Create a unique file name
  const fileExt = file.name.split(".").pop()
  const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `${userId}/${fileName}`

  // Upload the file
  const { data, error } = await supabase.storage.from("user-photos").upload(filePath, file)

  if (error) throw error

  // Get the public URL
  const { data: urlData } = supabase.storage.from("user-photos").getPublicUrl(filePath)

  // Update the user's profile with the new photo
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      avatar_url: urlData.publicUrl,
      has_uploaded_photo: true,
    })
    .eq("id", userId)

  if (updateError) throw updateError

  // Insert into photos table
  const { error: photoError } = await supabase.from("photos").insert({
    user_id: userId,
    file_path: filePath,
    public_url: urlData.publicUrl,
    is_primary: true,
    file_type: file.type,
    file_size: file.size,
  })

  if (photoError) throw photoError

  return urlData.publicUrl
}

// Create a recommendation session
export async function createRecommendationSession(userId: string, eventType: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("recommendation_sessions")
    .insert({
      user_id: userId,
      event_type: eventType,
      status: "processing",
    })
    .select()
    .single()

  if (error) throw error

  return data
}

// Generate recommendations
export async function generateRecommendations(sessionId: string, userId: string, eventType: string) {
  const supabase = createClient()

  // Call the edge function to generate recommendations
  // In development, use the mock recommendations endpoint
  const isDev = process.env.NODE_ENV === "development"
  const endpoint = isDev ? "mock-recommendations" : "generate-recommendations"

  const { data, error } = await supabase.functions.invoke(endpoint, {
    body: { sessionId, userId, eventType },
  })

  if (error) throw error

  return data.recommendations
}

// Submit feedback
export async function submitFeedback(sessionId: string, rating: "positive" | "negative", comment: string) {
  const supabase = createClient()

  const { data, error } = await supabase.functions.invoke("submit-feedback", {
    body: { sessionId, rating, comment },
  })

  if (error) throw error

  return data
}

// Update user profile
export async function updateUserProfile(
  name: string,
  username: string,
  age: number,
  gender: "female" | "male" | "other",
) {
  const supabase = createClient()

  const { data, error } = await supabase.functions.invoke("update-profile", {
    body: { name, username, age, gender },
  })

  if (error) throw error

  return data.profile
}

