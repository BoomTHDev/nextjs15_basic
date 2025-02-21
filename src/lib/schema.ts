import { z } from 'zod'

// Define Constants
const MIN_NAME_LENGTH = 3
const MIN_PASSWORD_LENGTH = 8
const SPECIAL_CHARS = '!@#$%^&*(),.?":{}|<>'

// Define validation message
const ERROR_MESSAGES = {
  name: `ชื่อต้องมีความยาวอย่างน้อย ${MIN_NAME_LENGTH} ตัวอักษร`,
  email: {
    format: 'กรุณากรอกอีเมลให้ถูกต้อง',
    domain: 'อีเมลต้องเป็น Gmail, Hotmail, Outlook หรือ Yahoo'
  },
  password: {
    length: `รหัสผ่านต้องมีความยาวอย่างน้อย ${MIN_PASSWORD_LENGTH} ตัวอักษร`,
    uppercase: 'รหัสผ่านต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว',
    lowercase: 'รหัสผ่านต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว',
    number: 'รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว',
    special: `รหัสผ่านต้องมีตัวอักขระพิเศษ ${SPECIAL_CHARS} อย่างน้อย 1 ตัว`
  },
  confirmPassword: 'รหัสผ่านไม่ตรงกัน'
}

// Define valid email domain
const VALID_DOMAINS = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com'
]

// Email domain validation
const isValidEmailDomain = (email: string) => {
  const domain = email ? email.split('@')[1].toLowerCase() : ''
  return VALID_DOMAINS.includes(domain)
}

// Password validation schema
const passwordSchema = z.string()
  .min(MIN_PASSWORD_LENGTH, { message: ERROR_MESSAGES.password.length })
  .regex(/[A-Z]/, { message: ERROR_MESSAGES.password.uppercase })
  .regex(/[a-z]/, { message: ERROR_MESSAGES.password.lowercase })
  .regex(/[0-9]/, { message: ERROR_MESSAGES.password.number })
  .regex(
    new RegExp(`[${SPECIAL_CHARS}]`),
    { message: ERROR_MESSAGES.password.special }
  )

// Main register schema
export const registerSchema = z.object({
  name: z.string()
    .optional()
    .refine(
      (name) => !name || name.length >= MIN_NAME_LENGTH,
      { message: ERROR_MESSAGES.name }
    ),

  email: z.string()
    .email({ message: ERROR_MESSAGES.email.format })
    .refine(
      (email) => isValidEmailDomain(email),
      { message: ERROR_MESSAGES.email.domain }
    ),

  password: passwordSchema,
  confirmPassword: z.string()
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: ERROR_MESSAGES.confirmPassword,
    path: ['confirmPassword']
  }
)

// Main Login schema
export const loginSchema = z.object({
  email: z.string()
    .email({ message: ERROR_MESSAGES.email.format })
    .refine(
      (email) => isValidEmailDomain(email),
      { message: ERROR_MESSAGES.email.domain }
    ),

  password: passwordSchema
})