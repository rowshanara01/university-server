import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import AppError from "../../errors/AppError";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    // academicDepartment k academicFaculty er sathe referencing korte hobe.
    // mane academicDepartment ta academicFaculty k refer korteche
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty", // modelName, eta diye referencing korte hoy
      // academicFaculty er model theke paichi
    },
  },
  {
    timestamps: true,
  }
);

// save. create dept validation. ager moto service eo kora zay
academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    name: this.name,
  });

  // throw new Error diye only error msg send kora zay but error status code send kora zay na.
  // er jnno Error class k extend kore 1ta super class korlam 'AppError' nam e.
  if (isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This department is already exist!"
    );
  }

  next();
});

// find one and update data
//*** pre 1ta middleware. caile academicFaculty er moto service eo validation kora zay.
// referenceing korar somoy dekhte hobe age oi namer faculty/ dpt ache kina
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartmentModel.findOne(query);

  if (!isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This department does not exist! "
    );
  }

  next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);