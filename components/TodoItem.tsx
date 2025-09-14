'use client'

import { useState } from 'react'
import { Todo, UpdateTodo } from '@/lib/zodSchemas'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Trash2, Edit2, Check, X } from 'lucide-react'

interface TodoItemProps {
  todo: Todo
  onUpdate: (id: string, updates: UpdateTodo) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)

  const handleToggleDone = async () => {
    await onUpdate(todo.id, {
      is_done: !todo.is_done,
    })
  }

  const handleSaveEdit = async () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      await onUpdate(todo.id, {
        title: editTitle.trim(),
      })
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditTitle(todo.title)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (confirm('このタスクを削除しますか？')) {
      await onDelete(todo.id)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600'
      case 'normal':
        return 'text-blue-600'
      case 'low':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return '高'
      case 'normal':
        return '中'
      case 'low':
        return '低'
      default:
        return '中'
    }
  }

  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg bg-white shadow-sm">
      <Checkbox
        checked={todo.is_done}
        onCheckedChange={handleToggleDone}
        className="flex-shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex gap-2">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="flex-1 bg-white text-gray-900"
              autoFocus
            />
            <Button size="sm" onClick={handleSaveEdit}>
              <Check className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancelEdit}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span
              className={`flex-1 text-gray-900 ${
                todo.is_done ? 'line-through text-gray-500' : ''
              }`}
            >
              {todo.title}
            </span>
            <span className={`text-xs font-medium ${getPriorityColor(todo.priority)}`}>
              {getPriorityLabel(todo.priority)}
            </span>
            {todo.due_date && (
              <span className="text-xs text-gray-500">
                {new Date(todo.due_date).toLocaleDateString('ja-JP')}
              </span>
            )}
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="text-gray-900 hover:text-gray-700"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
