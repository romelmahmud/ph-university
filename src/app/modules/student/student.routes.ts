import express, { Router } from 'express';
import { StudentControllers } from './student.controller';

const router: Router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
