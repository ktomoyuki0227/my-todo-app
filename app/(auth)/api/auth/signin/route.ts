import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabaseServer'

export async function POST() {
  try {
    const supabase = await createClient()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: siteUrl
        ? { redirectTo: `${siteUrl}/callback` }
        : undefined,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data?.url) {
      return NextResponse.json({ error: 'Failed to create sign-in URL' }, { status: 500 })
    }

    return NextResponse.json({ url: data.url })
  } catch (error) {
    console.error('Sign-in endpoint error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
