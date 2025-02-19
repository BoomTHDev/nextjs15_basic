import { NextRequest, NextResponse } from 'next/server'
import { books } from '../route'

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { name } = await req.json()
  const { id } = await params
  let book = books.find((b) => b.id === parseInt(id))
  if (book) {
    book.name = name
  }
  return NextResponse.json(books)
}

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const book = books.find((b) => b.id === parseInt(id))

    if (!book) {
      return NextResponse.json({
        message: 'หา book ไม่เจอ'
      }, { status: 404 })
    }

    return NextResponse.json(book, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: 'พัง'
    }, { status: 500 })
  }
}