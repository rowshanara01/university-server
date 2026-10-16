// from mongoose docs ts part

import { Model, Types } from "mongoose";

// type or interphase 2tai use kora zay
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  user: Types.ObjectId; // user k nilam
  password: string;
  name: UserName;
  gender: "male" | "female";
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId; // reference kora
  isDeleted: boolean;
  academicDepartment: Types.ObjectId; // reference kora
  academicFaculty: Types.ObjectId; // reference
};

export interface StudentModel extends Model<Student> {
  isUserExists(id: string): Promise<Student | null>;
}