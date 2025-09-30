'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthCallbackPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const handleAuth = async () => {
      // URLフラグメントからSupabaseが自動でセッションを処理
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Error getting session:', error)
        router.replace('/signin')
      } else if (data.session) {
        console.log('Login success, session:', data.session)
        router.replace('/todos')
      } else {
        router.replace('/signin')
      }
    }

    handleAuth()
  }, [router, supabase])

  return (
    <div className="flex h-screen items-center justify-center">
      <p>ログイン処理中です...</p>
    </div>
  )
}
