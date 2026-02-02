import { Error } from 'mongoose'

class ErrorHandler extends Error {
  status: any
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}
export default ErrorHandler
