'use server'

import { register } from '@/db/users'

export const registerAction = async (
  prevState: any,
  formData: FormData
) => {
  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string
  }

  const result = await register(rawData)

  const response = result?.message ? {
    success: false,
    message: result.message,
    errors: result.error
  } : {
    success: true,
    message: 'สมัครสมาชิกสำเร็จ'
  }

  return response

  // if (result && result.message) {
  //   return {
  //     success: false,
  //     message: result.message,
  //     errors: result.error
  //   }
  // } else {
  //   return {
  //     success: true,
  //     message: 'สมัครสมาชิกสำเร็จ'
  //   }
  // }
}