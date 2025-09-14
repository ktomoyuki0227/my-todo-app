import { useState, useCallback } from 'react'
import { Todo, CreateTodo, UpdateTodo } from '@/lib/zodSchemas'

// モックデータ
const initialTodos: Todo[] = [
  {
    id: '1',
    user_id: 'user-1',
    title: 'プロジェクトの企画書を作成する',
    is_done: false,
    priority: 'high',
    due_date: '2024-01-15',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z',
  },
  {
    id: '2',
    user_id: 'user-1',
    title: '買い物リストを整理する',
    is_done: true,
    priority: 'normal',
    due_date: '2024-01-12',
    created_at: '2024-01-09T14:30:00Z',
    updated_at: '2024-01-11T09:15:00Z',
  },
  {
    id: '3',
    user_id: 'user-1',
    title: '読書を30分する',
    is_done: false,
    priority: 'low',
    due_date: undefined,
    created_at: '2024-01-11T16:45:00Z',
    updated_at: '2024-01-11T16:45:00Z',
  },
]

export function useTodosLocal() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const createTodo = useCallback(async (todoData: CreateTodo): Promise<Todo> => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      user_id: 'user-1',
      title: todoData.title,
      is_done: false,
      priority: todoData.priority || 'normal',
      due_date: todoData.due_date,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    setTodos(prev => [newTodo, ...prev])
    return newTodo
  }, [])

  const updateTodo = useCallback(async ({ id, ...updates }: UpdateTodo & { id: string }): Promise<Todo> => {
    const updatedTodo = todos.find(todo => todo.id === id)
    if (!updatedTodo) {
      throw new Error('Todo not found')
    }

    const newTodo: Todo = {
      ...updatedTodo,
      ...updates,
      updated_at: new Date().toISOString(),
    }

    setTodos(prev => prev.map(todo => todo.id === id ? newTodo : todo))
    return newTodo
  }, [todos])

  const deleteTodo = useCallback(async (id: string): Promise<void> => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, [])

  return {
    todos,
    createTodo,
    updateTodo,
    deleteTodo,
  }
}
