import { NextResponse, NextRequest } from 'next/server'

export const GET = async () => {
  return NextResponse.json({
    message: 'Hi, Get'
  })
}

// export const POST = async (req: NextRequest) => {
//   const body = await req.json()
//   return NextResponse.json(body)
// }

// export const PUT = async (req: NextRequest) => {
//   const body = await req.json()
//   return NextResponse.json(body)
// }

// export const DELETE = async (req: NextRequest) => {
//   const body = await req.json()
//   return NextResponse.json(body)
// }