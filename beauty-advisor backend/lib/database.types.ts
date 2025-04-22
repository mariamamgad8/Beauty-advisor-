export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          username: string
          age: number
          gender: "female" | "male" | "other"
          avatar_url: string | null
          has_uploaded_photo: boolean
          updated_at: string
          preferences: Json
        }
        Insert: {
          id: string
          name: string
          username: string
          age: number
          gender: "female" | "male" | "other"
          avatar_url?: string | null
          has_uploaded_photo?: boolean
          updated_at?: string
          preferences?: Json
        }
        Update: {
          id?: string
          name?: string
          username?: string
          age?: number
          gender?: "female" | "male" | "other"
          avatar_url?: string | null
          has_uploaded_photo?: boolean
          updated_at?: string
          preferences?: Json
        }
      }
      photos: {
        Row: {
          id: string
          user_id: string
          file_path: string
          public_url: string
          uploaded_at: string
          is_primary: boolean
          file_type: string | null
          file_size: number | null
        }
        Insert: {
          id?: string
          user_id: string
          file_path: string
          public_url: string
          uploaded_at?: string
          is_primary?: boolean
          file_type?: string | null
          file_size?: number | null
        }
        Update: {
          id?: string
          user_id?: string
          file_path?: string
          public_url?: string
          uploaded_at?: string
          is_primary?: boolean
          file_type?: string | null
          file_size?: number | null
        }
      }
      recommendation_sessions: {
        Row: {
          id: string
          user_id: string
          event_type: "formal" | "casual" | "professional" | "party" | "date" | "other"
          status: "processing" | "completed"
          created_at: string
          completed_at: string | null
          photo_id: string | null
        }
        Insert: {
          id?: string
          user_id: string
          event_type: "formal" | "casual" | "professional" | "party" | "date" | "other"
          status?: "processing" | "completed"
          created_at?: string
          completed_at?: string | null
          photo_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          event_type?: "formal" | "casual" | "professional" | "party" | "date" | "other"
          status?: "processing" | "completed"
          created_at?: string
          completed_at?: string | null
          photo_id?: string | null
        }
      }
      recommendations: {
        Row: {
          id: string
          session_id: string
          makeup_recommendations: Json
          hair_recommendations: Json
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          makeup_recommendations: Json
          hair_recommendations: Json
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          makeup_recommendations?: Json
          hair_recommendations?: Json
          created_at?: string
        }
      }
      feedback: {
        Row: {
          id: string
          session_id: string
          user_id: string
          rating: "positive" | "negative"
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          user_id: string
          rating: "positive" | "negative"
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          user_id?: string
          rating?: "positive" | "negative"
          comment?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      gender_type: "female" | "male" | "other"
      event_type: "formal" | "casual" | "professional" | "party" | "date" | "other"
      status_type: "processing" | "completed"
      rating_type: "positive" | "negative"
    }
  }
}

