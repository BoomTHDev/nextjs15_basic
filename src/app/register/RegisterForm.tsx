'use client'

import Form from 'next/form'
import { registerAction } from './action'
import { useActionState, useEffect } from 'react'

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerAction, null)

  useEffect(() => {
    if (state && state.message) {
      alert(state.message)
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
          type='text'
          name='name'
          placeholder='name'
        />
        {state?.errors && (
          <p
            style={{
              color: 'red',
            }}
          >
            {state.errors.name?.[0]}
          </p>
        )}
      </div>

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

      <div>
        <input
          type='password'
          name='confirmPassword'
          placeholder='confirm password'
        />
        {state?.errors && (
          <p
            style={{
              color: 'red',
            }}
          >
            {state.errors.confirmPassword?.[0]}
          </p>
        )}
      </div>

      <button
        type='submit'
        disabled={isPending}
      >
        {isPending ? 'Registering...' : 'Register'}
      </button>
    </Form>
  )
}
export default RegisterForm
