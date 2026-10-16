// ### transaction & rollback implimented ###
// service e all business logic thakbe
// service database e query calabe
import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { studentSearchableFields } from "./student.constant";
import { Student } from "./student.interface";
import { ModelofStudent } from "./student.model";

//**** */ user e student create kortechi tai eta lagbe na
// ###populate notes### academicDepertment.service.ts file e dea ache
// zehetu 2ta field k populate kortechi tai chaining kortechi.
// mane 1ta populate sesh hole r 1ta lej lagay dite hobe
const getAllstudentFromDB = async (query: Record<string, unknown>) => {
  // searching
  const studentQuery = new QueryBuilder(
    // populate implemented. nested hole path bolte hoy
    ModelofStudent.find()
      .populate("user")
      .populate("admissionSemester")
      .populate("academicDepartment academicFaculty"), // ei 2ta field e database e save kortechi
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
};

// get a single student
// id diye zodi instance korte cai tahole,
const getSinglestudentFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({id}); // id ta student id
  // aggregate o caile kora zay

  const result = await ModelofStudent.findById(id)
    .populate("admissionSemester")
    .populate("academicDepartment academicFaculty");

  // previous refer er jnno
  // .populate(
  //   {
  //   path: "academicDepartment",
  //   // academicDepartment ta academicFaculty k refer kore.
  //   // ejnno academicDepartment er path bole dichi
  //   populate: {
  //     path: "academicFaculty",
  //   },
  // });
  return result;
};

// update student
const updateStudentFromDB = async (id: string, payload: Partial<Student>) => {
  // non premitive datagula payload theke ber korbo. cz amra pura docs ta update kortechi na.
  // kichu field update korbo bakigula same ager ta thakbe
  // ...remainingStudentData gula premitive data
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /* 
  testing data
    guardain: {
      fatherOccupation:"Teacher"
    } evabe data send korle mutued hoye zay. mutued mane shb change.
      // ager unchanged data o thakbe na

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  // dynamically primitive, non-primitive handle for update
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  // console.log(modifiedUpdatedData);

  // new: true, zate notun data pai r  runValidators: true, diye validation ta bar on kore dey
  const result = await ModelofStudent.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

// delete
// transaction & rollback implimented********
// user & student collection 2ta connected. student delete korle user o delete korte hobe.
// 2ta collection e 1sathe delete operation colbe. eijnno transaction & rollback use korchi.
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // mongoose er nijer _id zodi use kori tahole findById usekorte hobe.
    // amader generate kora id zodi use kori then findOneAndUpdate use korte hobe.
    // ekhane amader generate kora id use kore delete korbo tai findOneAndUpdate use korchi.

    // delete student
    const deletedStudent = await ModelofStudent.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    ); // id ta student id

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    // delete user
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction(); // commit korle data database e permanently save hoy
    await session.endSession(); // then endSession korte hoy

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete student");
  }
};

export const StudentService = {
  getAllstudentFromDB,
  getSinglestudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
};
