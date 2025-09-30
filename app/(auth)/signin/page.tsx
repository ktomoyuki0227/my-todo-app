'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabaseClient'

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    // 認証済みの場合は todos ページへリダイレクト
    if (!loading && user) {
      console.log('User already authenticated, redirecting to todos')
      router.replace('/todos')
    }
  }, [user, loading, router])

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/callback`,
        },
      })

      if (error) {
        console.error('Sign in error:', error.message)
        setIsLoading(false)
      }
      // 成功すると GitHub のログイン画面にリダイレクトされる
    } catch (error) {
      console.error('Sign in exception:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {loading ? (
        <div className="text-center">
          <div className="text-gray-600">認証状態を確認中...</div>
        </div>
      ) : (
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              ToDoアプリにサインイン
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              GitHubアカウントでサインインしてください
            </p>
          </div>
          
          <div className="mt-8">
            <Button
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2"
              size="lg"
            >
              <Github className="h-5 w-5" />
              {isLoading ? 'サインイン中...' : 'GitHubでサインイン'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}