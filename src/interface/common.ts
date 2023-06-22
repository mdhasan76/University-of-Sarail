export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessage: { message: string; path: string }[]
}
