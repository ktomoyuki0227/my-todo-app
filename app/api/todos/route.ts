import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabaseServer'
import { createTodoSchema } from '@/lib/zodSchemas'
import { requireAuth } from '@/lib/auth'

// GET /api/todos - Todo一覧取得
export async function GET() {
  try {
    const user = await requireAuth()
    const supabase = await createClient()

    const { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ todos })
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

// POST /api/todos - Todo作成
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const supabase = await createClient()
    
    const body = await request.json()
    const validatedData = createTodoSchema.parse(body)

    const { data: todo, error } = await supabase
      .from('todos')
      .insert({
        user_id: user.id,
        title: validatedData.title,
        priority: validatedData.priority,
        due_date: validatedData.due_date,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ todo }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
