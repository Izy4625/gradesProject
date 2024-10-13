import mongoose, { Schema, Document, Types } from "mongoose";

export interface Iclass extends Document {
    name: string,
    teacherId : Types.ObjectId,
    students: Types.ObjectId[]
}
const classSchema = new Schema<Iclass>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    teacherId:{
        type: Schema.Types.ObjectId, ref: "Teachers", required: true
    },
    students: [{type: Schema.Types.ObjectId, ref : "Students"}],
})
export default mongoose.model<Iclass>("Students", classSchema);
