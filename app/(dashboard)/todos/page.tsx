'use client'

import { useState } from 'react'
import { TodoForm } from '@/components/TodoForm'
import { TodoItem } from '@/components/TodoItem'
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from '@/hooks/useTodosQuery'
import { Button } from '@/components/ui/button'
import { CreateTodo } from '@/lib/zodSchemas'

function TodosContent() {
  const { data: todos = [], isLoading, error } = useTodos()
  const createTodoMutation = useCreateTodo()
  const updateTodoMutation = useUpdateTodo()
  const deleteTodoMutation = useDeleteTodo()
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'pending':
        return !todo.is_done
      case 'completed':
        return todo.is_done
      default:
        return true
    }
  })

  const handleCreateTodo = async (data: CreateTodo) => {
    await createTodoMutation.mutateAsync(data)
  }

  const handleUpdateTodo = async (id: string, updates: any) => {
    await updateTodoMutation.mutateAsync({ id, ...updates })
  }

  const handleDeleteTodo = async (id: string) => {
    await deleteTodoMutation.mutateAsync(id)
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12">
          <div className="text-gray-500">読み込み中...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12">
          <div className="text-red-500">エラーが発生しました: {error.message}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          タスク管理
        </h2>
        <p className="text-gray-600">
          あなたのタスクを管理しましょう
        </p>
      </div>

      <TodoForm onSubmit={handleCreateTodo} />

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            すべて ({todos.length})
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            未完了 ({todos.filter(t => !t.is_done).length})
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            完了 ({todos.filter(t => t.is_done).length})
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {filter === 'all' ? 'タスクがありません' : 
             filter === 'pending' ? '未完了のタスクがありません' : 
             '完了したタスクがありません'}
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default function TodosPage() {
  return <TodosContent />
}
