import { redirect } from 'next/navigation'
import LoginForm from './LoginForm'
import { getCurrentUser } from '@/db/users'

const LoginPage = async () => {

  const user = await getCurrentUser()

  if (user) {
    redirect('/profile')
  }

  return <LoginForm />
}
export default LoginPage
