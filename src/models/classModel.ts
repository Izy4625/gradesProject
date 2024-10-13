import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./userModel";

export interface IGrade {
    grade: number,
    comment: string
}
export interface Iklass extends Document {
    name: string,
    teacherId : Types.ObjectId,
    studentsWithGrades?: IStudent[]
}

export interface IStudent{
    studentId: Types.ObjectId
    grades?: IGrade[]
}
const gradeSchema = new Schema<IGrade> ({
    grade: {
        type: Number,
        required: true,
        min: [0, "test scores can't be less then 0"],
        max: [100, "test Scores can't be more then 100"]
    },
 comment: {
    type: String,
    maxlength: [100, "comments canot be longer then 100 characters"],
    required: true
 }
})
const studentSchema = new Schema<IStudent> ({
    studentId: {type: Schema.Types.ObjectId , ref: "Users", required: true},
    grades: [gradeSchema]

})
const classSchema = new Schema<Iklass>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    teacherId:{
        type: Schema.Types.ObjectId, ref: "Teachers", required: true
    },
    studentsWithGrades: [studentSchema],
})
export default mongoose.model<Iklass>("Classes", classSchema);
