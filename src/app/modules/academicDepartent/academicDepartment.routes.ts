import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentControllers } from './academicDepartment.controllers';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();
router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),

  AcademicDepartmentControllers.updateAcademicDepartment,
);
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);
router.get('/:id', AcademicDepartmentControllers.getSingleAcademicDepartment);

export const AcademicDepartmentRoutes = router;
