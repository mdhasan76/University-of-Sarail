import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandlers from './middlewares/globalErrorHandlers';
import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
const app: Application = express();

// Middleware
app.use(cors());
app.use(cookieParser());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api/v1/users', UserRoutes.userRouter);
// app.use('/api/v1/academic-semisters', AcademicSemisterRoutes);
app.use('/api/v1/', routes);
app.get('/', async (req: Request, res: Response) => {
  res.send(`Hello, You server is running`);
  // throw new ApiError(400, 'error handlig sikhtesi bhai, ')
  // throw new ApiError(400, 'Testing error logger')
  // console.log(x)
  // throw new Error('ore baba error')
  // next('Ore baba error')
  // Promise.reject(new Error('unhandle promise rejection'))
});

app.use(globalErrorHandlers);

// Handle not found route
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [{ path: req.originalUrl, message: 'API not found' }],
  });
});

export default app;
