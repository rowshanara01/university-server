import { z } from "zod";
import { AcademicSemesterCode, AcademicSemesterName, months } from "./academicSemester.constant";
// with zod
// interface & model er sathe align hobe
const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    // as [string, ...string[]] eta zod er type. eta dite hoy evabe
    name: z.enum([...AcademicSemesterName] as [string, ...string[]] ),
    year: z.string(),
    // code mane semester code
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]] ),
    startMonth: z.enum([...months ] as [string, ...string[]] ),
    endMonth: z.enum([...months ] as [string, ...string[]] ),
  })
});

// update validation
const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
    startMonth: z.enum([...months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...months] as [string, ...string[]]).optional(),
  }),
});


export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
