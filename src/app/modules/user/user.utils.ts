import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

// student id
const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    // field filtering kortechi
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({ createdAt: -1 })
    .lean(); // createdAt er opr base kore decending order e sort kortechi
  // lean() use korle query ta ektu fast hoy. zokhn query korar pore mongose er operation calabo na tokhn lean() use kora zabe.

  // 203001 0001; last er 4 digit mane 0001 er sathe 1 zog hobe. tai substring diye 6digit katbo
  return lastStudent?.id ? lastStudent.id : undefined;
};

// year, semester, 4digit number
// student id generated function
export const generateStudentId = async (payload: TAcademicSemester) => {
  // 1st time id 0000 theke start hoye +1 kore barbe
  // 4digit er number niye bakigula 0 boshay dibo

  // 1st time student zokhn enter hobe tokhn student er id hobe 0001. then +1 kore add hobe.
  // ei student gula decending order e sort hobe. last student ta 1st er dike zabe erpor +1 kore id barte thakbe
  // currentId ekhane dafeault value
  let currentId = (0).toString(); // 0000 by deafult
  // id ctring format e ache. string er sathe number add kora zay na.
  // tai string k number e convert kore roll no +1 kore baray dibo
  const lastStudentId = await findLastStudentId();
  //example id: 2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01
  const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  // condition check: semester id, code year egula zodi match kore tahole 6digit er por theke count shuru hobe
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6); // 6digit er por theke shuru hobe
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

// faculty id
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: "faculty",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

// faculty id generate
export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// admin id 
export const findLastAdminId = async()=>{
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  ).sort({
    createAt: -1,
  })
  .lean()

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
} 

// generate admin id
export const generateAdminId =async() =>{
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if(lastAdminId) {
    currentId = lastAdminId.substring(2)
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;

  return incrementId;
}