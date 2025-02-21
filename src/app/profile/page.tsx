import { getCurrentUser } from '@/db/users'
import { redirect } from 'next/navigation'

const ProfilePage = async () => {

  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Name: {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  )
}
export default ProfilePage