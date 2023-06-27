import express from 'express';
import { AcademicSemisterValidation } from './academicSemister.validation';
import validateRequest from '../../../middlewares/validateRequest';
import { AcademicSemisterController } from './academicSemister.controller';
const router = express.Router();

router.post(
  '/create-semister',
  validateRequest(AcademicSemisterValidation.createAcademicSemisterZodSchema),
  AcademicSemisterController.createAcademicSemister
);

router.get('/:id', AcademicSemisterController.getSingleSemister);
router.patch(
  '/:id',
  validateRequest(AcademicSemisterValidation.updateAcademicSemisterZodSchema),
  AcademicSemisterController.updateSemister
);
router.get('/', AcademicSemisterController.getAllSemisters);
export const AcademicSemisterRoutes = router;
