import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import AppError from "../../errors/AppError";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  months,
} from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: months,
    },
  },
  {
    timestamps: true,
  }
);

// same semester and year thakbe na. zemon 2024 er autumn 1tai hobe.
// eta korar jnno 1ta pre hook middleware kortechi zeta check korbe year and semester name.
// exist thakle new semester hobe na. r na thakle new semester create hobe.
// shb application e common tai model e likhchi
academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExists = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester is already exists!");
  }

  next();
});

// "AcademicSemester" menas mongose collection name. mongose convert it plural all small case
// like academicsemesters emn hobe
export const AcademicSemesterModel = model<TAcademicSemester>(
  "AcademicSemester", // this is the model name
  academicSemesterSchema
);
