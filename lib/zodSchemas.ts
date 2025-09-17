import { z } from 'zod'

// Todo関連のスキーマ
export const todoSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string().min(1, 'タイトルは必須です').max(200, 'タイトルは200文字以内で入力してください'),
  is_done: z.boolean().default(false),
  priority: z.enum(['low', 'normal', 'high']).default('normal'),
  due_date: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
})

export const createTodoSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(200, 'タイトルは200文字以内で入力してください'),
  priority: z.enum(['low', 'normal', 'high']).default('normal').optional(),
  due_date: z.string().optional(),
})

export const updateTodoSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(200, 'タイトルは200文字以内で入力してください').optional(),
  is_done: z.boolean().optional(),
  priority: z.enum(['low', 'normal', 'high']).optional(),
  due_date: z.string().optional(),
})

// Profile関連のスキーマ
export const profileSchema = z.object({
  id: z.string().uuid(),
  display_name: z.string().optional(),
  created_at: z.string(),
})

export const updateProfileSchema = z.object({
  display_name: z.string().min(1, '表示名は必須です').max(50, '表示名は50文字以内で入力してください'),
})

// 型のエクスポート
export type Todo = z.infer<typeof todoSchema>
export type CreateTodo = z.infer<typeof createTodoSchema>
export type UpdateTodo = z.infer<typeof updateTodoSchema>
export type Profile = z.infer<typeof profileSchema>
export type UpdateProfile = z.infer<typeof updateProfileSchema>
