interface RegisterInput {
  name?: string
  email: string
  password: string
  confirmPassword: string
}

const register = async (input: RegisterInput) => {
  console.log(input)
}

register({
  name: 'Kob',
  email: 'kob555@mail.com',
  password: '1234',
  confirmPassword: '1234'
})