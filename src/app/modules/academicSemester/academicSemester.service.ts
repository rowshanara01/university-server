import QueryBuilder from "../../builder/QueryBuilder";
import {
  academicSemesterNameCodeMapper,
  AcademicSemesterSearchableFields,
} from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemester.model";

// parameter hisebe 1ta data receive korbe zeta amra "payload" nam dichi
// ekhane "TAcademicSemester" payload hisebe receive korteche

// create semester
const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // semester name er sathe se,ester er code match kortechi zate wrong entry na hoy
  // Autumn = 01, Summer = 02, Fall = 03

  // map type declear korlam. key hobe string r za hold korteche oitaw string
  // subidha => infuture semester new add hole type niye pera nai
  // code organize korar jnno type TAcademicSemesterNameCodeMapper => interface e
  // constant academicSemesterNameCodeMapper eta academicSemester er constant e

  // business logics er jnno common tai eikhane mane service e likhchi
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester code");
  }

  const result = await AcademicSemesterModel.create(payload);
  return result;
};

// get all semester data
const getAllAcademicSemestersFromDB = async (
  query: Record<string, unknown>
) => {
  const academicSemesterQuery = new QueryBuilder(
    AcademicSemesterModel.find(),
    query
  )
    .search(AcademicSemesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicSemesterQuery.modelQuery;
  const meta = await academicSemesterQuery.countTotal();

  return { meta, result };
};

// get single semester data
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id);
  return result;
};

// update academic semester
const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicSemesterModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
