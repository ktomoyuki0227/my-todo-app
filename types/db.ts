// Supabaseの型定義（手動で定義、後でsupabase codegenで自動生成可能）
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string | null
          created_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          created_at?: string
        }
      }
      todos: {
        Row: {
          id: string
          user_id: string
          title: string
          is_done: boolean
          priority: 'low' | 'normal' | 'high'
          due_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          is_done?: boolean
          priority?: 'low' | 'normal' | 'high'
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          is_done?: boolean
          priority?: 'low' | 'normal' | 'high'
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
