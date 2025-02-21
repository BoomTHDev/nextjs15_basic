import { getCurrentUser } from '@/db/users'
import RegisterForm from './RegisterForm'
import { redirect } from 'next/navigation'

const RegisterPage = async () => {
  const user = await getCurrentUser()

  if (user) {
    redirect('/profile')
  }
  return <RegisterForm />
}
export default RegisterPage
