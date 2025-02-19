'use client'

import { useState, useEffect } from 'react'

const ClientPage = () => {

  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log("count =", count)
  }, [count])

  const addCount = () => {
    setCount(count + 1)
  }

  return (
    <div>
      {count}
      <button onClick={addCount}>Add Count</button>
    </div>
  )
}

export default ClientPage
