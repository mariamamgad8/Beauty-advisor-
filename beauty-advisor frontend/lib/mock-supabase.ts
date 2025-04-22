import { mockUser, mockProfile, mockSessions, mockRecommendations } from "./mock-data"

// Mock Supabase client for UI/UX testing
export const createMockClient = () => {
  // Store state for the mock client
  let currentUser = null
  let currentSession = null
  const userProfiles = [mockProfile]
  const recommendationSessions = [...mockSessions]
  const feedbackEntries = mockSessions.flatMap((session) => session.feedback || [])

  return {
    auth: {
      // Sign up with email and password
      signUp: async ({ email, password }: { email: string; password: string }) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        currentUser = { ...mockUser, email }
        currentSession = { user: currentUser, session: { access_token: "mock-token" } }

        return {
          data: currentSession,
          error: null,
        }
      },

      // Sign in with email and password
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        currentUser = { ...mockUser, email }
        currentSession = { user: currentUser, session: { access_token: "mock-token" } }

        return {
          data: currentSession,
          error: null,
        }
      },

      // Get current user
      getUser: async () => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        return {
          data: { user: currentUser || mockUser },
          error: null,
        }
      },

      // Sign out
      signOut: async () => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        currentUser = null
        currentSession = null

        return {
          error: null,
        }
      },
    },

    // Database operations
    from: (table: string) => {
      return {
        select: (columns = "*") => {
          return {
            eq: (column: string, value: any) => {
              return {
                single: async () => {
                  // Simulate network delay
                  await new Promise((resolve) => setTimeout(resolve, 500))

                  if (table === "profiles") {
                    const profile = userProfiles.find((p) => p[column as keyof typeof p] === value)
                    return {
                      data: profile || mockProfile,
                      error: null,
                    }
                  }

                  return { data: null, error: { message: "Not found" } }
                },
                order: (orderColumn: string, { ascending }: { ascending: boolean }) => {
                  return {
                    limit: (limit: number) => {
                      return {
                        single: async () => {
                          // Simulate network delay
                          await new Promise((resolve) => setTimeout(resolve, 500))

                          if (table === "recommendation_sessions") {
                            const sessions = recommendationSessions
                              .filter((s) => s[column as keyof typeof s] === value)
                              .sort((a, b) => {
                                if (ascending) {
                                  return (
                                    new Date(a[orderColumn as keyof typeof a] as string).getTime() -
                                    new Date(b[orderColumn as keyof typeof b] as string).getTime()
                                  )
                                } else {
                                  return (
                                    new Date(b[orderColumn as keyof typeof b] as string).getTime() -
                                    new Date(a[orderColumn as keyof typeof a] as string).getTime()
                                  )
                                }
                              })
                              .slice(0, limit)

                            return {
                              data: sessions[0] || null,
                              error: null,
                            }
                          }

                          return { data: null, error: { message: "Not found" } }
                        },
                      }
                    },
                  }
                },
              }
            },
            order: (orderColumn: string, { ascending }: { ascending: boolean }) => {
              return {
                async get() {
                  // Simulate network delay
                  await new Promise((resolve) => setTimeout(resolve, 500))

                  if (table === "recommendation_sessions") {
                    const sessions = [...recommendationSessions].sort((a, b) => {
                      if (ascending) {
                        return (
                          new Date(a[orderColumn as keyof typeof a] as string).getTime() -
                          new Date(b[orderColumn as keyof typeof b] as string).getTime()
                        )
                      } else {
                        return (
                          new Date(b[orderColumn as keyof typeof b] as string).getTime() -
                          new Date(a[orderColumn as keyof typeof a] as string).getTime()
                        )
                      }
                    })

                    // Add feedback to each session
                    const sessionsWithFeedback = sessions.map((session) => {
                      const feedback = feedbackEntries.filter((f) => f.session_id === session.id)
                      return { ...session, feedback }
                    })

                    return {
                      data: sessionsWithFeedback,
                      error: null,
                    }
                  }

                  return { data: [], error: null }
                },
              }
            },
          }
        },
        insert: (items: any[]) => {
          return {
            async select() {
              // Simulate network delay
              await new Promise((resolve) => setTimeout(resolve, 800))

              if (table === "profiles") {
                const newProfile = { ...items[0] }
                userProfiles.push(newProfile)
                return {
                  data: newProfile,
                  error: null,
                }
              }

              if (table === "recommendation_sessions") {
                const newSession = {
                  ...items[0],
                  id: `session-${Date.now()}`,
                  created_at: new Date().toISOString(),
                  feedback: [],
                }
                recommendationSessions.push(newSession)
                return {
                  data: newSession,
                  error: null,
                }
              }

              if (table === "feedback") {
                const newFeedback = {
                  ...items[0],
                  id: `feedback-${Date.now()}`,
                  created_at: new Date().toISOString(),
                }
                feedbackEntries.push(newFeedback)
                return {
                  data: newFeedback,
                  error: null,
                }
              }

              return { data: null, error: null }
            },
          }
        },
        update: (updates: any) => {
          return {
            eq: async (column: string, value: any) => {
              // Simulate network delay
              await new Promise((resolve) => setTimeout(resolve, 800))

              if (table === "profiles") {
                const index = userProfiles.findIndex((p) => p[column as keyof typeof p] === value)
                if (index !== -1) {
                  userProfiles[index] = { ...userProfiles[index], ...updates }
                }
                return {
                  data: userProfiles[index],
                  error: null,
                }
              }

              if (table === "recommendation_sessions") {
                const index = recommendationSessions.findIndex((s) => s[column as keyof typeof s] === value)
                if (index !== -1) {
                  recommendationSessions[index] = { ...recommendationSessions[index], ...updates }
                }
                return {
                  data: recommendationSessions[index],
                  error: null,
                }
              }

              return { data: null, error: null }
            },
          }
        },
      }
    },

    // Storage operations
    storage: {
      from: (bucket: string) => {
        return {
          upload: async (path: string, file: File) => {
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 1500))

            return {
              data: { path },
              error: null,
            }
          },
          getPublicUrl: (path: string) => {
            return {
              data: {
                publicUrl: "/placeholder.svg?height=200&width=200",
              },
            }
          },
        }
      },
    },

    // Helper method to get recommendations based on event type
    getRecommendations: (eventType: string) => {
      const makeup =
        mockRecommendations.makeup[eventType as keyof typeof mockRecommendations.makeup] ||
        mockRecommendations.makeup.other
      const hair =
        mockRecommendations.hair[eventType as keyof typeof mockRecommendations.hair] || mockRecommendations.hair.other

      return { makeup, hair }
    },
  }
}

