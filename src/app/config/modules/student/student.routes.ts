import express, { Router } from 'express';
import { StudentControllers } from './student.controller';

const router: Router = express.Router();

router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;
