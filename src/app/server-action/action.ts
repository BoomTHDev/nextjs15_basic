'use server'

import { z } from 'zod'

const nameSchema = z.string().min(1, { message: 'ต้องกรอกข้อมูล' })

const userSchema = z.object({
  name: z.string().min(1, { message: 'ต้องกรอกชื่อ' }),
  age: z.number({ message: 'ต้องกรอกอายุ' }).min(10, { message: 'อายุต้องมากกว่า 10 ปี' })
})

// Server action Funciton
export const getName = async (
  prevState: any,
  formData: FormData
) => {
  const name = formData.get('name') as string
  const age = formData.get('age') as string

  const validated = userSchema.safeParse({
    name: name,
    age: parseInt(age)
  })
  
  if (!validated.success) {
    console.log(validated.error.flatten().fieldErrors)
    return {
      success: false,
      error: validated.error.flatten().fieldErrors
    }
  }

  console.log(validated)

  return {
    success: true,
    data: 'Ok'
  }
}