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
        // セッションの取得を複数回試行
        let attempts = 0
        const maxAttempts = 3
        let session = null

        while (attempts < maxAttempts) {
          const { data } = await supabase.auth.getSession()
          session = data.session

          if (session?.user) {
            router.replace('/todos')
            return
          }

          attempts++
          // 少し待ってから再試行
          await new Promise(resolve => setTimeout(resolve, 1000))
        }

        // セッション取得に失敗した場合
        console.error('Failed to get session after multiple attempts')
        router.replace('/signin')
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
