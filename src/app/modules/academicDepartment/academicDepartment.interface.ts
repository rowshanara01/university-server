import { Types } from "mongoose";

export type TAcademicDepartment = {
    name: string;
    // academicDepartment k academicFaculty er sathe referencing korte hobe.
    // cz same facultyr under e onk department thakte pare
    academicFaculty: Types.ObjectId;
}