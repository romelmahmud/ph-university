import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// Application routes

// app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// handling error globally

app.use(globalErrorHandler);

// not found route

app.use(notFound);

export default app;
