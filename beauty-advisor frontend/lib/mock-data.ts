// Mock user data
export const mockUser = {
  id: "mock-user-id-123",
  email: "test@example.com",
  created_at: new Date().toISOString(),
}

// Mock profile data
export const mockProfile = {
  id: "mock-user-id-123",
  name: "Jane Doe",
  username: "janedoe",
  age: 28,
  gender: "female",
  avatar_url: "/placeholder.svg?height=200&width=200",
  has_uploaded_photo: true,
}

// Mock recommendation sessions
export const mockSessions = [
  {
    id: "session-1",
    user_id: "mock-user-id-123",
    event_type: "formal",
    status: "completed",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    feedback: [
      {
        id: "feedback-1",
        session_id: "session-1",
        user_id: "mock-user-id-123",
        rating: "positive",
        comment: "Loved the makeup suggestions!",
        created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "session-2",
    user_id: "mock-user-id-123",
    event_type: "casual",
    status: "completed",
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    feedback: [
      {
        id: "feedback-2",
        session_id: "session-2",
        user_id: "mock-user-id-123",
        rating: "negative",
        comment: "The hairstyle wasn't quite right for me.",
        created_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "session-3",
    user_id: "mock-user-id-123",
    event_type: "party",
    status: "completed",
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    feedback: [],
  },
]

// Mock recommendations data
export const mockRecommendations = {
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

