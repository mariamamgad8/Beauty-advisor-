"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase-client"
import { Loader2, Upload } from "lucide-react"

export default function UploadPhoto() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState("")
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      // Check file type
      if (!selectedFile.type.startsWith("image/")) {
        setError("Please select an image file")
        return
      }

      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB")
        return
      }

      setFile(selectedFile)
      setError("")

      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file || !user) return

    try {
      setLoading(true)
      const supabase = createClient()

      // Upload file to Supabase Storage
      const fileExt = file.name.split(".").pop()
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `profile-photos/${fileName}`

      const { error: uploadError } = await supabase.storage.from("user-photos").upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: urlData } = supabase.storage.from("user-photos").getPublicUrl(filePath)

      // Update user profile with photo URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          avatar_url: urlData.publicUrl,
          has_uploaded_photo: true,
        })
        .eq("id", user.id)

      if (updateError) throw updateError

      // Redirect to event selection
      router.push("/select-event")
    } catch (err: any) {
      console.error("Error uploading photo:", err)
      setError(err.message || "Error uploading photo")
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
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-pink-800">Upload Your Photo</h2>
            <p className="mt-2 text-gray-600">
              Please upload a clear, well-lit photo of your face to get the best recommendations
            </p>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">{error}</div>
          )}

          <div className="mb-6">
            <div
              className="border-2 border-dashed border-pink-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-colors"
              onClick={() => document.getElementById("photo-upload")?.click()}
            >
              {preview ? (
                <div className="relative w-48 h-48 mb-4">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <Upload className="h-8 w-8 text-pink-600" />
                </div>
              )}

              <p className="text-sm text-gray-500 text-center">
                {preview ? "Click to change photo" : "Click to select a photo or drag and drop"}
              </p>
              <input id="photo-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleUpload}
              disabled={!file || loading}
              className="bg-pink-600 hover:bg-pink-700 text-white rounded-full py-2 px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </div>

          <p className="mt-4 text-xs text-center text-gray-500">
            Your photo will only be used to generate personalized recommendations and will be stored securely.
          </p>
        </div>
      </div>
    </div>
  )
}

