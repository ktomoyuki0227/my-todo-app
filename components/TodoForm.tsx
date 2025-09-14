'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTodoSchema, CreateTodo } from '@/lib/zodSchemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TodoFormProps {
  onSubmit: (data: CreateTodo) => Promise<void>
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTodo>({
    resolver: zodResolver(createTodoSchema),
  })

  const handleFormSubmit = async (data: CreateTodo) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      reset()
    } catch (error) {
      console.error('Failed to create todo:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex gap-2 mb-6">
      <div className="flex-1">
        <Input
          {...register('title')}
          placeholder="新しいタスクを入力..."
          className={`bg-white text-gray-900 placeholder:text-gray-500 ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '追加中...' : '追加'}
      </Button>
    </form>
  )
}
