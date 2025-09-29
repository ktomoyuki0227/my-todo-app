'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function AuthCallbackPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (user) {
        // 認証に成功している場合は todos へ
        router.replace('/todos')
      } else {
        // 認証されていない場合はサインインへ
        router.replace('/signin')
      }
    }
  }, [user, loading, router])

  return null
}
