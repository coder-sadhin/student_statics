import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.get('/all_student', StudentControllers.getAllStudent);
router.get('/student_data/:studentId', StudentControllers.getStudentByID);
router.delete(
  '/delete_student/:studentId',
  StudentControllers.deleteStudentByID,
);

export const StudentRoute = router;
