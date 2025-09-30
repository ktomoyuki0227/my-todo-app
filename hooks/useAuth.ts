'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    // 初期認証状態を取得
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        // セッションが存在する場合にユーザーをセット
        if (session?.user) {
          setUser(session.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Unexpected error getting session:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // 認証状態の変更を監視（重複更新を防止）
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        // 状態が実際に変更された場合のみ更新
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user)
          // サインイン時に /todos にリダイレクト
          router.replace('/todos')
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          router.replace('/signin')
        }
        
        // ローディング状態を更新
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return { user, loading }
}
