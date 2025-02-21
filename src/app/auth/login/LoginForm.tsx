'use client'

import Form from 'next/form'
import Link from 'next/link'
import { loginAction } from './action'
import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const LoginForm = () => {

  const [state, formAction, isPending] = useActionState(loginAction, null)
  const router = useRouter()

  useEffect(() => {
    if (state && state.message) {
      alert(state.message)
    }

    if (state && state.success) {
      router.push('/profile')
    }
  }, [state])

  return (
    <Form
      action={formAction}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
    >

      <div>
        <input
          type='email'
          name='email'
          placeholder='email'
        />
        {state?.errors && (
          <p
            style={{
              color: 'red',
            }}
          >
            {state.errors.email?.[0]}
          </p>
        )}
      </div>

      <div>
        <input
          type='password'
          name='password'
          placeholder='password'
        />
        {state?.errors && (
          <p
            style={{
              color: 'red',
            }}
          >
            {state.errors.password?.[0]}
          </p>
        )}
      </div>

      <button
        type='submit'
        disabled={isPending}
      >
        {isPending ? 'Logging...' : 'Login'}
      </button>

      <Link href='/register'>Go to register</Link>
    </Form>
  )
}
export default LoginForm
