import { redirect } from 'next/navigation'

export default function Home() {
  // 一時的にSupabase認証を無効化し、直接todosページにリダイレクト
  redirect('/todos')
}
