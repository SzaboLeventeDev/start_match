type User = {
  userId: number,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  email: string,
  password: string
}

export type RegistrableUser = Omit<User, 'userId'> & {
  passwordAgain: string,
}