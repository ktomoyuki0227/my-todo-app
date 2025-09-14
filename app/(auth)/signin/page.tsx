'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider: 'github' }),
      })

      if (response.ok) {
        const { url } = await response.json()
        window.location.href = url
      } else {
        console.error('Sign in failed')
      }
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
    </div>
  )
}
