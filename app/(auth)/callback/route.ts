import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/db'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/todos'
  const cookieStore = cookies()

  if (code) {
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    })
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('OAuth callback error:', error.message)
      return NextResponse.redirect(
        new URL('/signin?error=oauth_callback', requestUrl.origin)
      )
    }
  } else {
    console.warn('OAuth callback invoked without code parameter')
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin))
}
