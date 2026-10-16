import auth from "../../middlewares/auth";
import  express  from 'express';
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validRequest";
import { EnrolledCourseValidations } from "./enrolledCourse.validaton";
import { EnrolledCourseControllers } from "./enrolledCourse.controller";


const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

router.get(
  '/',
  auth(USER_ROLE.faculty),
  EnrolledCourseControllers.getAllEnrolledCourses,
);

router.get(
  '/my-enrolled-courses',
  auth(USER_ROLE.student),
  EnrolledCourseControllers.getMyEnrolledCourses,
);

router.patch(
  '/update-enrolled-course-marks',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;