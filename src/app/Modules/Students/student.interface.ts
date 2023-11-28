import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string | undefined;
  lastName: string;
};

export type bloodGroups =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudentInterface = {
  id: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  password: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: bloodGroups;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string | undefined;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
};

export interface StudentModel extends Model<TStudentInterface> {
  isUserExits(id: string): Promise<TStudentInterface | null>;
}

// THIS IS FOR CREATING Methods

// export type StudentMethods = {
//   isUserExits(id: string): Promise<TStudentInterface | null>;
// };

// export type StudentModel = Model<
//   TStudentInterface,
//   Record<string, never>,
//   StudentMethods
// >;
