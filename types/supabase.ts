export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          birth_date: string
          cpf: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          birth_date: string
          cpf: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          birth_date?: string
          cpf?: string
          created_at?: string
          updated_at?: string
        }
      }
      registrations: {
        Row: {
          id: string
          user_id: string
          event_id: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          event_id: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          event_id?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      registration_details: {
        Row: {
          id: string
          registration_id: string
          parent_name: string
          parent_email: string
          parent_phone: string
          camper_name: string
          camper_birth_date: string
          camper_gender: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          registration_id: string
          parent_name: string
          parent_email: string
          parent_phone: string
          camper_name: string
          camper_birth_date: string
          camper_gender: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          registration_id?: string
          parent_name?: string
          parent_email?: string
          parent_phone?: string
          camper_name?: string
          camper_birth_date?: string
          camper_gender?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}