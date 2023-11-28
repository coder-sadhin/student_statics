import { model, Schema } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudentInterface,
  StudentModel,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
    trim: true,
    maxlength: [20, 'First Name should not be more then 20 character'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'fatherName is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'fatherOccupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'fatherContactNo is required'],
  },
  motherName: {
    type: String,
    required: [true, 'motherName is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'motherOccupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'motherContactNo is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'localGuardian Name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'localGuardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'localGuardian contactNo is required'],
  },
  address: {
    type: String,
    required: [true, 'localGuardian address is required'],
  },
});

const studentSchema = new Schema<TStudentInterface, StudentModel>(
  {
    id: { type: String, unique: true },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "The gender filed can only be one of the following: 'male', 'female', 'other' ",
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date Of Birth is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valid mail address',
      },
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message:
          "The bloodGroup filed can only be one of the following: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-' ",
      },
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    profileImg: {
      type: String,
    },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtuals

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const userData = this;

  // bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
  userData.password = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// query middleware

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.statics.isUserExits = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// This is for CREATING Methods
// studentSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudentInterface, StudentModel>(
  'Student',
  studentSchema,
);
