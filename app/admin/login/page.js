import { redirect } from 'next/navigation'
import { LoginForm } from './LoginForm'

export const metadata = { title: 'Admin Login', robots: { index: false, follow: false } }

function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
      <LoginForm />
    </div>
  )
}

export default LoginPage
