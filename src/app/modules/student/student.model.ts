// **validation er kaj gula model e kore**
//**** */ password bcrypt er kaj o model ei********
// create schema and model here
// required: true, maxlength etc..  >> mane eta build in validation
import { Schema, model } from "mongoose";

import {
  Guardian,
  LocalGuardian,
  Student,
  StudentModel,
  UserName,
} from "./student.interface";

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    // mongoose er type capital hoy.like String,
    // ts e all small. like string
    required: [true, "first name is required"],
    trim: true, // space remove kore samne piche thakle
    // custom error msg.
    maxlength: [20, "first name can not be more than 20 character"],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "last name is required"],
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuradianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

//**  custom instance method
// step 3. model e update (instant method rest part)
// StudentInstanceModel, StudentMethods ..... egula parameter hisebe add kore dite hoy
const studentSchema = new Schema<Student, StudentModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    // user
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user ID is required"],
      unique: true,
      ref: "User", // student er sathe user er connect korar jnno ref
    },
    name: {
      type: userNameSchema,
      required: [true, "Name is required"],
    },
    // enum type
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not valid",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "{VALUE} is not a valid blood group",
      },
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuradianSchema,
      required: true,
    },
    profileImg: { type: String, default: "" },
    //** referencing */ admission semester er type hobe object id
    // age interface er moddhe add korte hobe same nam diye
    // like, admissionSemester nam e age interface then model e property add korte hoy
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester", //
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    // reference
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
  },
  {
    //** virtual data on thake na. on kore nite hoy ***
    toJSON: {
      virtuals: true,
    },
  }
);

// // {
//   toJSON:{
//     virtuals: true,
//   }
// } *** virtual data on thake na. on kore nite hoy

//*******  virtual data *************
//******  virtual data: zei data direct database e nai, but ami just client side e dekhaite cai emn data k database theke ene dekhay dea.
// example: database e fullname nam e kichu nai. but 1stname , middle, last name ache. tai tinta milay ami fullname dekhabo.. eta virtual data.

studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} + ${this.name.middleName} + ${this.name.lastName}`;
});

// **********password bcrypt****************
// model er baire kaj nai
// interface r model e password field add kora lagbe
// *** pre hook middleware hook use kore password k database e save korar age hashing korlam
// password hashing
// pre save middleware/hook: will work on create() save()

//***  query middleware*******
// ei function diye delete howa data gula dekhabo na.
// amra actually data remove kortechi na. data zokhn delete hobe tokhn isDelete: true kore ekta flag e on rakhbo. data ta show korbo na.
// data remove korle datar consistency nosto hoy tai data ta hide kore rakhbo zate show na kore delete howa data

studentSchema.pre("find", function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } }); // current query k bujhabe
  next();
});

// find_one er opr delete kaj kore. mane findone query calay dile delete howa data pawa zay.
//  eijnno findone er opr eo 'pre' calabo zeno delete howa data pawa na zay

studentSchema.pre("findOne", function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } }); // current query k bujhabe
  next();
});

// findone e delete howa data dicche na but aggregate e abar data dey. tai etaw prevent korte hobe.
// zeno aggregate korleo delete howa data na ashe
studentSchema.pre("aggregate", function (next) {
  // console.log(this);
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }); // current query k bujhabe
  // unshift korle 1st e add hoy. zegula delete = true hoy seigula age 1ta ary te add hoye then delete hobe
  next();
});
// end (delete howa data gula dekhabo na)

//**  custom instance method
// step 4. implimentation
//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await ModelofStudent.findOne({ id });
  return existingUser;
};

// step 4. implementation... little kaj
// StudentModel update: StudentInstanceModel add kora lagbe
export const ModelofStudent = model<Student, StudentModel>(
  "Student",
  studentSchema
);
