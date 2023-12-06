import express from 'express';
import validateRequest from '../../Middlewares/validateRequest';
import { StudentValidators } from '../Students/student.velidators';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create_student',
  validateRequest(StudentValidators.studentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoute = router;
