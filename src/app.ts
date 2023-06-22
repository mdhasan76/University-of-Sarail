import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandlers from './middlewares/globalErrorHandlers'
import { UserRoutes } from './app/modules/user/user.route'

const app: Application = express()

// parser or Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', UserRoutes.userRouter)

app.get('/', (req: Request, res: Response) => {
  res.send(`Hello, You server is running`)
  // throw new ApiError(400, 'Kire error handlig sikhtesi')
  // throw new Error('ore baba error')
  // next('Ore baba error')
})

app.use(globalErrorHandlers)

export default app
