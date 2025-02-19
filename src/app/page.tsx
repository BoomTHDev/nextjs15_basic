'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

const HomePage = () => {

  const router = useRouter()

  return (
    <div>
      <a href="/hello">Go to Hello Page A</a>
      <br />
      <Link href="/hello">Go to Hello Page Link</Link>
      <br />
      <button onClick={() => router.push('/hello')}>
        Go to Hello Page useRouter
      </button>
    </div>
  )
}

export default HomePage