import { prisma } from '@/lib/prisma'
import { registerSchema, loginSchema } from '@/lib/schema'
import bcrypt from 'bcrypt'
import * as jose from 'jose'
import { cookies, headers } from 'next/headers'

interface RegisterInput {
  name?: string
  email: string
  password: string
  confirmPassword: string
}

interface LoginInput {
  email: string
  password: string
}

export const register = async (input: RegisterInput) => {
  try {
    const validated = registerSchema.safeParse(input)

    if (!validated.success) {
      console.log(validated.error.flatten().fieldErrors)
      return {
        message: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        error: validated.error.flatten().fieldErrors
      }
    }
  
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validated.data.email
      }
    })
  
    if (existingUser) {
      return {
        message: 'อีเมลนี้มีผู้ใช้งานแล้ว'
      }
    }
  
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(validated.data.password, salt)
  
    const newUser = await prisma.user.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        password: hashedPassword
      }
    })
  
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    const payload = {
      id: newUser.id
    }
    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d') // 1 day
      .sign(secret)
  
    const cookie = await cookies()
    cookie.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 // 1 day
    })
  } catch (error) {
    console.error('Error registration user:', error)
    return {
      message: 'เกิดข้อผิดพลาดในการสมัครสมาชิก'
    }
  }
}

export const login = async (input: LoginInput) => {
  try {
    const validated = loginSchema.safeParse(input)

    if (!validated.success) {
      return {
        message: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        error: validated.error.flatten().fieldErrors
      }
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: validated.data.email
      }
    })

    if (!existingUser || !await bcrypt.compare(validated.data.password, existingUser.password)) {
      console.log('user not found')
      return {
        message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
      }
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    const payload = {
      id: existingUser.id
    }
    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d') // 1 day
      .sign(secret)
  
    const cookie = await cookies()
    cookie.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 // 1 day
    })
  } catch (error) {
    console.error('Error login user:', error)
    return {
      message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' 
    }
  }
}

export const getCurrentUser = async () => {
  try {
    const head = await headers()
    const userId = head.get('x-user-id')

    if (!userId) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// register({
//   name: 'Kob',
//   email: 'kob555@gmail.com',
//   password: 'Aa112233*',
//   confirmPassword: 'Aa112233*'
// })

// login({
//   email: 'kob555@gmail.com',
//   password: 'Aa112233*'
// })