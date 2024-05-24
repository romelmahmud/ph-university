import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/config/modules/student/student.routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

// Application routes

app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
