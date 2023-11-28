import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.velidators';

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body.student;
    const zodPerseData = studentValidationSchema.parse(studentData);
    const result = await StudentServices.createStudentIntoDB(zodPerseData);

    res.status(200).json({
      success: true,
      message: 'Student is Created Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Somethings went wrong',
      data: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromBD();

    res.status(200).json({
      success: true,
      message: 'All Student Find Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Somethings went wrong',
      data: error,
    });
  }
};

const getStudentByID = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getStudentById(studentId);

    res.status(200).json({
      success: true,
      message: 'Student Find Successful',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Somethings went wrong',
      data: error,
    });
  }
};

const deleteStudentByID = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    // const result = await StudentServices.getStudentById(studentId);
    const result = await StudentServices.deleteStudentFromBD(studentId);

    res.status(200).json({
      success: true,
      message: 'Student Successfully Deleted',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Somethings went wrong',
      data: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getStudentByID,
  deleteStudentByID,
};
