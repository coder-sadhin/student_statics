import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'firstName is required' })
    .max(20, { message: 'First Name should not be more than 20 characters' }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'lastName is required' })
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: '{value} is not valid',
    }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'fatherName is required' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'fatherOccupation is required' }),
  fatherContactNo: z
    .string()
    .min(1, { message: 'fatherContactNo is required' }),
  motherName: z.string().min(1, { message: 'motherName is required' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'motherOccupation is required' }),
  motherContactNo: z
    .string()
    .min(1, { message: 'motherContactNo is required' }),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'localGuardian Name is required' }),
  occupation: z
    .string()
    .min(1, { message: 'localGuardian occupation is required' }),
  contactNo: z
    .string()
    .min(1, { message: 'localGuardian contactNo is required' }),
  address: z.string().min(1, { message: 'localGuardian address is required' }),
});

const studentValidationSchema = z.object({
  id: z.string(),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
  contactNo: z.string().min(1, { message: 'Contact number is required' }),
  emergencyContactNo: z
    .string()
    .min(1, { message: 'Emergency contact number is required' }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().min(1, { message: 'Present address is required' }),
  permanentAddress: z
    .string()
    .min(1, { message: 'Permanent address is required' }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().default(false),
});

export default studentValidationSchema;
