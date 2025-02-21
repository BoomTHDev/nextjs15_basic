'use server'

import { login } from "@/db/users"

export const loginAction = async (
  prevState: any,
  formData: FormData
) => {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const result = await login(rawData)

  const response = result?.message ? {
    success: false,
    message: result.message,
    errors: result.error
  } : {
    success: true,
    message: 'เข้าสู่ระบบสำเร็จ'
  }

  return response
}