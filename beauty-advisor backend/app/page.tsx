import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-pink-800 mb-6">
            Your Personal Beauty Advisor
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8">
            Get personalized makeup and hairstyle recommendations based on your unique features and occasion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-6 rounded-full text-lg"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-pink-600 text-pink-600 hover:bg-pink-50 px-8 py-6 rounded-full text-lg"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-pink-800 mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-pink-50 rounded-2xl p-6 text-center shadow-md">
              <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-pink-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">Create Your Profile</h3>
              <p className="text-gray-600">Sign up and upload a clear photo of yourself to get started</p>
            </div>

            <div className="bg-pink-50 rounded-2xl p-6 text-center shadow-md">
              <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-pink-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">Select Your Event</h3>
              <p className="text-gray-600">
                Tell us what occasion you're preparing for - formal, casual, or special event
              </p>
            </div>

            <div className="bg-pink-50 rounded-2xl p-6 text-center shadow-md">
              <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-pink-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive personalized makeup and hairstyle suggestions tailored just for you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-pink-800 mb-12">What Our Users Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-pink-800">Sarah Johnson</h4>
                  <p className="text-gray-500 text-sm">For a wedding</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I was so impressed with the recommendations! The makeup style perfectly matched my features and the
                formal event I was attending."
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-pink-800">Emily Davis</h4>
                  <p className="text-gray-500 text-sm">For a job interview</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The professional look suggested for my interview was perfect - subtle yet polished. I felt confident
                and got the job!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-pink-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-pink-800 mb-6">Ready to Transform Your Look?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Join thousands of users who have discovered their perfect style with our AI-powered recommendations
          </p>
          <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-6 rounded-full text-lg">
            <Link href="/signup">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pink-800 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Beauty Advisor</h3>
            <p className="text-pink-200">Your personal style companion</p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-pink-200 hover:text-white">
              About
            </a>
            <a href="#" className="text-pink-200 hover:text-white">
              Privacy
            </a>
            <a href="#" className="text-pink-200 hover:text-white">
              Terms
            </a>
            <a href="#" className="text-pink-200 hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

