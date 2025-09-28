import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'

export default async function Home() {
  try {
    const user = await getUser()
    
    if (user) {
      redirect('/todos')
    } else {
      redirect('/signin')
    }
  } catch (error) {
    console.error('Error checking auth in home page:', error)
    redirect('/signin')
  }
}
