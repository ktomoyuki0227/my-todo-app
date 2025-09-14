'use client'

import { User } from 'lucide-react'

export function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            ToDoアプリ
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>ダッシュボード</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
