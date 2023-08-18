export interface User {
  fullname: string
  username: string
  password: string
  role: 'ADMIN' | 'USER'
}