'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function AuthCallback() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (user) {
        // 認証成功 - todosページにリダイレクト
        console.log('Auth successful, redirecting to todos')
        router.replace('/todos')
      } else {
        // セッションなし - サインインページにリダイレクト
        console.log('No session found, redirecting to signin')
        router.replace('/signin')
      }
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-gray-600">
          {loading ? '認証処理中...' : 'リダイレクト中...'}
        </div>
      </div>
    </div>
  )
}