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

app.get('/', async (req: Request, res: Response) => {
  res.send(`Hello, You server is running`)
  // throw new ApiError(400, 'error handlig sikhtesi bhai, ')
  // throw new ApiError(400, 'Testing error logger')
  // console.log(x)
  // throw new Error('ore baba error')
  // next('Ore baba error')
  // Promise.reject(new Error('unhandle promise rejection'))
})

app.use(globalErrorHandlers)

export default app
