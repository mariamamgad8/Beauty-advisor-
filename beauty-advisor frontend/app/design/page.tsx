import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DesignScreens() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-pink-800">Beauty Advisor - UI/UX Design</h1>
          <Button asChild variant="outline" className="border-pink-600 text-pink-600">
            <Link href="/design-system">View Design System</Link>
          </Button>
        </div>

        <Tabs defaultValue="landing" className="mb-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="landing">Landing</TabsTrigger>
            <TabsTrigger value="auth">Auth</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="event">Event</TabsTrigger>
            <TabsTrigger value="recommendations">Results</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

          {/* Landing Page */}
          <TabsContent value="landing">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-pink-800">Landing Page</h2>
              <p className="text-gray-600">
                The landing page introduces users to the Beauty Advisor service with a clean, feminine design using soft
                pinks and purples.
              </p>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img src="/placeholder.svg?height=800&width=1200" alt="Landing Page Design" className="w-full h-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-pink-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-pink-800 mb-2">Key Elements</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Hero section with clear value proposition</li>
                      <li>Call-to-action buttons for sign up and login</li>
                      <li>Features section explaining how the service works</li>
                      <li>Testimonials from satisfied users</li>
                      <li>Final CTA section to encourage conversion</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-pink-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-pink-800 mb-2">Design Notes</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Soft gradient background from pink to purple</li>
                      <li>Rounded elements for a feminine aesthetic</li>
                      <li>Clear typography hierarchy with emphasis on benefits</li>
                      <li>Ample white space for readability</li>
                      <li>Consistent color scheme throughout</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Authentication Screens */}
          <TabsContent value="auth">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-pink-800">Authentication Screens</h2>
              <p className="text-gray-600">
                The sign-up and login screens collect user information and authenticate users.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-pink-800">Sign Up</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.svg?height=600&width=800"
                      alt="Sign Up Screen Design"
                      className="w-full h-auto"
                    />
                  </div>
                  <Card className="border-pink-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-pink-800 mb-2">Form Fields</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>Full Name</li>
                        <li>Age</li>
                        <li>Gender (radio buttons)</li>
                        <li>Email address</li>
                        <li>Username</li>
                        <li>Password</li>
                        <li>Confirm Password</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-pink-800">Login</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.svg?height=600&width=800"
                      alt="Login Screen Design"
                      className="w-full h-auto"
                    />
                  </div>
                  <Card className="border-pink-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-pink-800 mb-2">Form Fields</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>Email address</li>
                        <li>Password</li>
                        <li>Forgot password link</li>
                        <li>Sign up link for new users</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Photo Upload */}
          <TabsContent value="upload">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-pink-800">Photo Upload Screen</h2>
              <p className="text-gray-600">
                The photo upload screen allows users to upload a clear photo for AI analysis.
              </p>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=600&width=1000"
                  alt="Photo Upload Screen Design"
                  className="w-full h-auto"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-pink-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-pink-800 mb-2">Key Elements</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Clear instructions for photo requirements</li>
                      <li>Drag and drop upload area</li>
                      <li>File browser button alternative</li>
                      <li>Preview of uploaded image</li>
                      <li>Continue button to proceed</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-pink-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-pink-800 mb-2">User Experience Notes</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Simple, focused interface with minimal distractions</li>
                      <li>Clear feedback for successful upload</li>
                      <li>Error handling for invalid file types or sizes</li>
                      <li>Privacy reassurance message</li>
                      <li>Loading state during upload process</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Event Selection */}
          <TabsContent value="event">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-pink-800">Event Selection Screen</h2>
              <p className="text-gray-600">
                The event selection screen allows users to specify what occasion they're preparing for.
              </p>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=600&width=1000"
                  alt="Event Selection Screen Design"
                  className="w-full h-auto"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-pink-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-pink-800 mb-2">Event Options</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Formal Event (weddings, galas)</li>
                      <li>Casual Outing (day-to-day activities)</li>
                      <li>Professional Setting (interviews, meetings)</li>
                      <li>Party (birthdays, celebrations)</li>
                      <li>Romantic Date (dinner dates)</li>
                      <li>Other (custom occasions)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-pink-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-pink-800 mb-2">Design Elements</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Card-based selection with visual icons</li>
                      <li>Clear visual feedback for selected option</li>
                      <li>Brief description of each event type</li>
                      <li>Continue button enabled only after selection</li>
                      <li>Consistent layout with previous screens</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Recommendations */}
          <TabsContent value="recommendations">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-pink-800">Recommendations Screen</h2>
              <p className="text-gray-600">
                The recommendations screen displays personalized makeup and hairstyle suggestions based on the user's
                photo and selected event.
              </p>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=800&width=1200"
                  alt="Recommendations Screen Design"
                  className="w-full h-auto"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-pink-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-pink-800 mb-2">Content Structure</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Tabbed interface for makeup and hairstyle</li>
                      <li>Title and description for each recommendation</li>
                      <li>Detailed product and technique suggestions</li>
                      <li>Pro tips section with additional advice</li>
                      <li>Visual separation of different recommendation parts</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-pink-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-pink-800 mb-2">Feedback Section</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Binary feedback options (thumbs up/down)</li>
                      <li>Optional comment field for detailed feedback</li>
                      <li>Clear visual feedback for selected rating</li>
                      <li>Submit button for feedback submission</li>
                      <li>Loading state during submission</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-pink-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-pink-800 mb-2">Visual Design</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Card-based layout for recommendations</li>
                      <li>Color-coded sections for different content types</li>
                      <li>Ample white space for readability</li>
                      <li>Consistent typography hierarchy</li>
                      <li>Navigation to dashboard after feedback</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Dashboard */}
          <TabsContent value="dashboard">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-pink-800">Dashboard Screen</h2>
              <p className="text-gray-600">
                The dashboard allows users to view their recommendation history and manage their profile.
              </p>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=800&width=1200"
                  alt="Dashboard Screen Design"
                  className="w-full h-auto"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-pink-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-pink-800 mb-2">Dashboard Tabs</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Recommendation History - past recommendations with dates and event types</li>
                      <li>Profile Management - personal information and photo</li>
                      <li>Account Settings - password, notifications, account deletion</li>
                      <li>New Recommendation button for starting a new session</li>
                      <li>Logout functionality</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-pink-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-pink-800 mb-2">History Cards</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Date and event type for each recommendation</li>
                      <li>Status indicator (completed, processing)</li>
                      <li>Feedback indicator (liked/disliked)</li>
                      <li>Link to view full recommendation details</li>
                      <li>Grid layout for multiple history items</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* User Flow Diagram */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-pink-800 mb-4">Complete User Flow</h2>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="Complete User Flow Diagram"
              className="w-full h-auto"
            />
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium">User Journey Map:</p>
              <ol className="list-decimal pl-5 mt-2 space-y-2">
                <li>
                  <strong>Awareness & Discovery</strong> - User discovers the Beauty Advisor service through marketing
                  or referral
                </li>
                <li>
                  <strong>Consideration</strong> - User explores the landing page to understand the service benefits
                </li>
                <li>
                  <strong>Registration</strong> - User signs up with personal details to create an account
                </li>
                <li>
                  <strong>Onboarding</strong> - User uploads a photo and selects an event type
                </li>
                <li>
                  <strong>Service Delivery</strong> - User receives personalized makeup and hairstyle recommendations
                </li>
                <li>
                  <strong>Feedback</strong> - User provides feedback on the recommendations to improve future results
                </li>
                <li>
                  <strong>Retention</strong> - User returns to the dashboard to view history and request new
                  recommendations
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Responsive Design */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-pink-800 mb-4">Responsive Design</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-pink-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-pink-800 mb-2">Mobile View</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <img src="/placeholder.svg?height=600&width=300" alt="Mobile Design" className="w-full h-auto" />
                </div>
                <ul className="list-disc pl-5 mt-4 space-y-1 text-gray-600">
                  <li>Single column layout</li>
                  <li>Stacked navigation</li>
                  <li>Optimized touch targets</li>
                  <li>Simplified UI elements</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-pink-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-pink-800 mb-2">Tablet View</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <img src="/placeholder.svg?height=600&width=500" alt="Tablet Design" className="w-full h-auto" />
                </div>
                <ul className="list-disc pl-5 mt-4 space-y-1 text-gray-600">
                  <li>Two-column layout where appropriate</li>
                  <li>Optimized for touch and keyboard</li>
                  <li>Balanced white space</li>
                  <li>Adaptive navigation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-pink-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-pink-800 mb-2">Desktop View</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <img src="/placeholder.svg?height=400&width=700" alt="Desktop Design" className="w-full h-auto" />
                </div>
                <ul className="list-disc pl-5 mt-4 space-y-1 text-gray-600">
                  <li>Multi-column layout</li>
                  <li>Horizontal navigation</li>
                  <li>Enhanced visual elements</li>
                  <li>Full feature visibility</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Accessibility Considerations */}
        <section>
          <h2 className="text-2xl font-semibold text-pink-800 mb-4">Accessibility Considerations</h2>
          <Card className="border-pink-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-pink-800 mb-2">Visual Accessibility</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Color contrast ratios meet WCAG 2.1 AA standards</li>
                    <li>Text is resizable without breaking layouts</li>
                    <li>Focus states are clearly visible for keyboard navigation</li>
                    <li>Icons include text labels or aria-labels</li>
                    <li>Form elements have associated labels</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-pink-800 mb-2">Functional Accessibility</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>All interactive elements are keyboard accessible</li>
                    <li>Screen reader compatibility with semantic HTML</li>
                    <li>Error messages are clear and descriptive</li>
                    <li>Sufficient time provided for form submissions</li>
                    <li>Alternative text for all images</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

