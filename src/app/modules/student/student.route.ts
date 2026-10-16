import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validRequest";
import { USER_ROLE } from "../user/user.constant";
import { StudentController } from "./student.controller";
import { updateStudentValidationSchema } from "./student.zod.validation";

// route, controller, service. new route banale sathe sathe controller & service eo update kora lage
const router = express.Router();

// will call controller
// router.post('/create-student', StudentController.createStudent )
// get all student
router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentController.getAllstudents
);
// get single student
router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentController.getSinglestudent
);

// update student
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateStudentValidationSchema),
  StudentController.updateStudent
);
// delete student
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentController.deleteStudent
);

export const StudentRoutes = router;
