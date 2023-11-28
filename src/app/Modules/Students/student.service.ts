import { TStudentInterface } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudentInterface) => {
  if (await Student.isUserExits(studentData.id)) {
    throw new Error('User already exists');
  }

  const result = await Student.create(studentData);

  // create instance

  // const student = new Student(studentData);
  // if (await student.isUserExits(studentData.id)) {
  //   throw new Error('User already exists');
  // }

  // const result = await student.save();

  return result;
};

const getAllStudentFromBD = async () => {
  const result = await Student.find();
  return result;
};

const getStudentById = async (id: string) => {
  const result = await Student.findOne({ id: id });
  return result;
};

const deleteStudentFromBD = async (id: string) => {
  const result = await Student.updateOne({ id: id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromBD,
  getStudentById,
  deleteStudentFromBD,
};
