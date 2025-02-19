'use client'

import { useState, useEffect } from 'react'

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

const FetchingPage = () => {
  const url = 'https://jsonplaceholder.typicode.com/todos'
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await fetch(url)
      const data = await response.json()
      setTodos(data)

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div>กำลังโหลด...</div>
    )
  }

  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index}>{todo.title}</div>
      ))}
    </div>
  )
}
export default FetchingPage