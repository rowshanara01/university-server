import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentService } from "./student.service";

// create student
// user age create korte hobe tai ekhaner createStudent function user.controller e niye geche

//** get Single student
const getSinglestudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.getSinglestudentFromDB(studentId);
  // send response er kaj controller e evabeo kora zay.
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student is get successfully",
    data: result,
  });
});

//**  get all students
const getAllstudents: RequestHandler = catchAsync(async (req, res) => {
  // req, res. next er type alada declear na kore 1bare RequestHandler dileo hobe. same kaj

  const result = await StudentService.getAllstudentFromDB(req.query);
  // send response er kaj controller e evabeo kora zay.
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "students are getting successfully",
    meta: result.meta,
    data: result.result,
  });
});

// delete students
const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.deleteStudentFromDB(studentId);

  // send response er kaj controller e evabeo kora zay.
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "students is deleted successfully",
    data: result,
  });
});

// update student
const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentService.updateStudentFromDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is updated succesfully",
    data: result,
  });
});

export const StudentController = {
  getAllstudents,
  getSinglestudent,
  deleteStudent,
  updateStudent,
};
