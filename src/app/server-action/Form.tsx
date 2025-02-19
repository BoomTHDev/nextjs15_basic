'use client'

import Form from 'next/form'
import { getName } from './action'
import { useActionState, useEffect } from 'react'

const FormComp = () => {
  const [state, formAction, isPending] = useActionState(getName, null)

  useEffect(() => {
    if (state && state.success) {
      alert(state.data)
    }
  }, [state])

  return (
    <Form action={formAction}>
      <input
        type='text'
        name='name'
        placeholder='name'
      />
      <p style={{ color: 'red' }}>{state?.error && state.error.name}</p>
      <input
        type='number'
        name='age'
        placeholder='age'
      />
      <p style={{ color: 'red' }}>{state?.error && state.error.age}</p>
      <button type='submit'>{isPending ? 'Submitting...' : 'Submit'}</button>
    </Form>
  )
}
export default FormComp
