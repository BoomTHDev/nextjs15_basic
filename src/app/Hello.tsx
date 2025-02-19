'use client'

interface HelloProps {
  name?: string
  age?: number
}

const Hello = ({ name, age }: HelloProps) => {
  // code JS or TS

  return (
    <div>
      <h1>{name}</h1>
      <p>{age}</p>
    </div>
  )
}

export default Hello