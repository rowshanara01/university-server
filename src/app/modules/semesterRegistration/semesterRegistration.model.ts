import mongoose, { Schema }  from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";

const semesterRegestrationSchema = new mongoose.Schema<TSemesterRegistration>(
    {
        academicSemester:{
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: 'AcademicSemester',
        },
        status:{
            type: String,
            enum: SemesterRegistrationStatus,
            default: 'UPCOMING',
        },
        startDate:{
            type: Date,
            required: true,
        },
        endDate:{
            type: Date,
            required: true,
        },
        minCredit:{
            type: Number,
            default: 3,
        },
        maxCredit:{
            type: Number,
            default: 15,
        },

    },
    {
        timestamps: true,
    }
)

export const SemesterRegistration = mongoose.model<TSemesterRegistration>(
    'SemesterRegistration',
    semesterRegestrationSchema,
)