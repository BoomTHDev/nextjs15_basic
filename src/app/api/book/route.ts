import { NextRequest, NextResponse } from 'next/server'

export const books = [
  { id: 1, name: 'Book 1' },
  { id: 2, name: 'Book 2' },
  { id: 3, name: 'Book 3' },
]

export const GET = async () => {
  return NextResponse.json(books)
}

export const POST = async (req: NextRequest) => {
  const { id, name } = await req.json()
  books.push({
    id, // id: id
    name // name: name
  })
  return NextResponse.json(books)
}

export const PUT = async (req: NextRequest) => {
  const { id, name } = await req.json()
  let book = books.find((b) => b.id === id)
  if (book) {
    book.name = name
  }
  return NextResponse.json(books)
}

export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json()
  const removedBooks = books.filter((b) => b.id !== id)
  return NextResponse.json(removedBooks)
}