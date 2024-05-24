import express, { Router } from 'express';
import { StudentControllers } from './student.controller';

const router: Router = express.Router();

router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;
