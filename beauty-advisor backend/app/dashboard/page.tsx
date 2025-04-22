"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase-client"
import { Loader2, History, User, Settings, LogOut } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    const fetchUserData = async () => {
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

        // Get recommendation history
        const { data: historyData, error: historyError } = await supabase
          .from("recommendation_sessions")
          .select(`
            *,
            feedback(*)
          `)
          .eq("user_id", userData.user.id)
          .order("created_at", { ascending: false })

        if (historyError) throw historyError
        setHistory(historyData || [])
      } catch (err) {
        console.error("Error fetching user data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-pink-800">Welcome, {profile?.name || "User"}</h1>
            <p className="text-gray-600">Manage your beauty recommendations and profile</p>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push("/select-event")}
              className="border-pink-600 text-pink-600 hover:bg-pink-50"
            >
              New Recommendation
            </Button>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-gray-600 hover:text-pink-800 hover:bg-pink-100"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="history" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              Recommendation History
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              My Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            {history.length === 0 ? (
              <Card className="border-pink-200">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600 mb-4">You haven't received any recommendations yet.</p>
                  <Button
                    onClick={() => router.push("/select-event")}
                    className="bg-pink-600 hover:bg-pink-700 text-white"
                  >
                    Get Your First Recommendation
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {history.map((session) => (
                  <Card key={session.id} className="border-pink-200 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between items-center">
                        <span className="capitalize">{session.event_type} Event</span>
                        <span className="text-sm text-gray-500 font-normal">{formatDate(session.created_at)}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                          Status: <span className="capitalize">{session.status}</span>
                        </span>

                        {session.feedback && session.feedback.length > 0 && (
                          <span
                            className={`text-sm px-2 py-1 rounded-full ${
                              session.feedback[0].rating === "positive"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {session.feedback[0].rating === "positive" ? "Liked" : "Disliked"}
                          </span>
                        )}
                      </div>

                      <Button
                        variant="link"
                        onClick={() => router.push(`/recommendations?session=${session.id}`)}
                        className="text-pink-600 p-0 h-auto"
                      >
                        View Recommendations
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-pink-200 md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Profile Photo</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  {profile?.avatar_url ? (
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <img
                        src={profile.avatar_url || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                      <User className="h-12 w-12 text-pink-600" />
                    </div>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => router.push("/upload-photo")}
                    className="mt-2 border-pink-600 text-pink-600 hover:bg-pink-50"
                    size="sm"
                  >
                    Update Photo
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-pink-200 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex justify-between items-center">
                    <span>Personal Information</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-pink-600 hover:bg-pink-50"
                      onClick={() => router.push("/profile/edit")}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Name</h4>
                      <p>{profile?.name || "Not provided"}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Username</h4>
                      <p>{profile?.username || "Not provided"}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Email</h4>
                      <p>{user.email}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Age</h4>
                        <p>{profile?.age || "Not provided"}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Gender</h4>
                        <p className="capitalize">{profile?.gender || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-pink-200 md:col-span-3">
                <CardHeader>
                  <CardTitle className="text-lg">Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Change Password</h4>
                        <p className="text-sm text-gray-500">Update your account password</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-pink-600 text-pink-600 hover:bg-pink-50"
                        onClick={() => router.push("/profile/change-password")}
                      >
                        Change
                      </Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Notification Preferences</h4>
                        <p className="text-sm text-gray-500">Manage your email notifications</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-pink-600 text-pink-600 hover:bg-pink-50"
                        onClick={() => router.push("/profile/notifications")}
                      >
                        Manage
                      </Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-red-600">Delete Account</h4>
                        <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-600 hover:bg-red-50"
                        onClick={() => router.push("/profile/delete-account")}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

