import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StudentServices } from './student.service';

// const catchAsync = (fn: RequestHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch((error) => next(error));
//   };
// };

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromBD();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Student Find Successfully',
    data: result,
  });
});

const getStudentByID = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getStudentById(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Find Successful',
    data: result,
  });
});

const deleteStudentByID = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromBD(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Successfully Deleted',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudent,
  getStudentByID,
  deleteStudentByID,
};

// import studentValidationSchema from './student.velidators';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const studentData = req.body.student;
//     const zodPerseData = studentValidationSchema.parse(studentData);
//     const result = await StudentServices.createStudentIntoDB(zodPerseData);

//     res.status(200).json({
//       success: true,
//       message: 'Student is Created Successfully',
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message || 'Somethings went wrong',
//       data: error,
//     });
//   }
// };

// catch (error: any) {
//   res.status(400).json({
//     success: false,
//     message: error.message || 'Somethings went wrong',
//     data: error,
//   });
