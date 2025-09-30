'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function CallbackPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        // セッションがある場合は /todos へリダイレクト
        if (session?.user) {
          router.replace('/todos')
        } else {
          router.replace('/signin')
        }
      } catch (error) {
        console.error('Error handling authentication callback:', error)
        router.replace('/signin')
      }
    }

    handleAuth()
  }, [router, supabase])

  return (
    <div className="flex h-screen items-center justify-center">
      <p>ログイン処理中...</p>
    </div>
  )
}
