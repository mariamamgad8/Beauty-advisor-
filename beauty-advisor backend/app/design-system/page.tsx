import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown, Upload } from "lucide-react"

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-pink-800 mb-8">Beauty Advisor - UI/UX Design System</h1>

      {/* Color Palette */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-pink-800 mb-4">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-24 bg-pink-600 rounded-md"></div>
            <p className="text-sm font-medium">Primary Pink</p>
            <p className="text-xs text-gray-500">#db2777</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-pink-800 rounded-md"></div>
            <p className="text-sm font-medium">Dark Pink</p>
            <p className="text-xs text-gray-500">#9d174d</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-pink-100 rounded-md"></div>
            <p className="text-sm font-medium">Light Pink</p>
            <p className="text-xs text-gray-500">#fce7f3</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-pink-50 rounded-md"></div>
            <p className="text-sm font-medium">Background Pink</p>
            <p className="text-xs text-gray-500">#fdf2f8</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-purple-600 rounded-md"></div>
            <p className="text-sm font-medium">Accent Purple</p>
            <p className="text-xs text-gray-500">#9333ea</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-purple-50 rounded-md"></div>
            <p className="text-sm font-medium">Light Purple</p>
            <p className="text-xs text-gray-500">#faf5ff</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-white border border-gray-200 rounded-md"></div>
            <p className="text-sm font-medium">White</p>
            <p className="text-xs text-gray-500">#ffffff</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-gray-600 rounded-md"></div>
            <p className="text-sm font-medium">Text Gray</p>
            <p className="text-xs text-gray-500">#4b5563</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-pink-800 mb-4">Typography</h2>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-pink-800 mb-2">Heading 1</h1>
            <p className="text-sm text-gray-500">Font: Inter, 48-60px, Extra Bold</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-pink-800 mb-2">Heading 2</h2>
            <p className="text-sm text-gray-500">Font: Inter, 30px, Bold</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-pink-800 mb-2">Heading 3</h3>
            <p className="text-sm text-gray-500">Font: Inter, 24px, Bold</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-pink-800 mb-2">Heading 4</h4>
            <p className="text-sm text-gray-500">Font: Inter, 20px, Semi Bold</p>
          </div>
          <div>
            <p className="text-lg text-gray-700 mb-2">Body Large</p>
            <p className="text-sm text-gray-500">Font: Inter, 18px, Regular</p>
          </div>
          <div>
            <p className="text-base text-gray-700 mb-2">Body Regular</p>
            <p className="text-sm text-gray-500">Font: Inter, 16px, Regular</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Body Small</p>
            <p className="text-sm text-gray-500">Font: Inter, 14px, Regular</p>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-pink-800 mb-4">UI Components</h2>

        <div className="space-y-8">
          {/* Buttons */}
          <div>
            <h3 className="text-xl font-semibold text-pink-800 mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">Primary Button</Button>
                <p className="text-xs text-gray-500">Primary Action</p>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50">
                  Secondary Button
                </Button>
                <p className="text-xs text-gray-500">Secondary Action</p>
              </div>
              <div className="space-y-2">
                <Button variant="ghost" className="text-pink-600 hover:bg-pink-50">
                  Ghost Button
                </Button>
                <p className="text-xs text-gray-500">Tertiary Action</p>
              </div>
              <div className="space-y-2">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full">Rounded Button</Button>
                <p className="text-xs text-gray-500">CTA Button</p>
              </div>
            </div>
          </div>

          {/* Form Elements */}
          <div>
            <h3 className="text-xl font-semibold text-pink-800 mb-4">Form Elements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="example-input">Text Input</Label>
                  <Input id="example-input" placeholder="Enter your name" />
                </div>

                <div>
                  <Label htmlFor="example-textarea">Textarea</Label>
                  <Textarea id="example-textarea" placeholder="Enter your feedback" />
                </div>

                <div>
                  <div className="mb-2">
                    <Label>Radio Group</Label>
                  </div>
                  <RadioGroup defaultValue="female" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female-example" />
                      <Label htmlFor="female-example">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male-example" />
                      <Label htmlFor="male-example">Male</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">File Upload</p>
                  <div className="border-2 border-dashed border-pink-300 rounded-lg p-6 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                      <Upload className="h-8 w-8 text-pink-600" />
                    </div>
                    <p className="text-sm text-gray-500 text-center">Click to select a photo or drag and drop</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Feedback Controls</p>
                  <div className="flex space-x-4">
                    <Button variant="outline" className="border-green-600 text-green-600">
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Love it!
                    </Button>
                    <Button variant="outline" className="border-red-600 text-red-600">
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      Not for me
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div>
            <h3 className="text-xl font-semibold text-pink-800 mb-4">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle>Feature Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">This card style is used for features and information sections.</p>
                </CardContent>
              </Card>

              <Card className="border-pink-200 bg-pink-50">
                <CardHeader>
                  <CardTitle>Recommendation Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    This highlighted card style is used for recommendations and important content.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tabs */}
          <div>
            <h3 className="text-xl font-semibold text-pink-800 mb-4">Tabs</h3>
            <Tabs defaultValue="tab1">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="tab1">Makeup Recommendations</TabsTrigger>
                <TabsTrigger value="tab2">Hairstyle Recommendations</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <Card className="border-pink-200">
                  <CardContent className="p-4">
                    <p className="text-gray-600">Content for makeup recommendations tab.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tab2">
                <Card className="border-pink-200">
                  <CardContent className="p-4">
                    <p className="text-gray-600">Content for hairstyle recommendations tab.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* User Flow Diagram */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-pink-800 mb-4">User Flow</h2>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <img src="/placeholder.svg?height=400&width=800" alt="User Flow Diagram" className="w-full h-auto" />
          <div className="mt-4 text-sm text-gray-600">
            <p className="font-medium">User Flow Description:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-2">
              <li>User lands on the homepage and learns about the service</li>
              <li>User signs up with personal details (name, age, gender, email, username, password)</li>
              <li>User uploads a clear photo of themselves</li>
              <li>User selects the type of event they're preparing for</li>
              <li>System generates personalized makeup and hairstyle recommendations</li>
              <li>User provides feedback on the recommendations</li>
              <li>User can view their history and manage their profile from the dashboard</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  )
}

