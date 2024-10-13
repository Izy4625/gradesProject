import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

export interface IGrades {
   grade: number,
   comment: string,

}

export interface Istudent extends Document  {
        name: string,
        email: string,
        password: string,
        class: string
        grades: IGrades[]
        average_Score?: number       
}
const gradeSchema = new Schema<IGrades> ({
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

const studentSchema = new Schema<Istudent> ({
    name: {
        type: String,
        required: true,

    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail , "your email adress is not valid" ]
        
      },
      password: {
            type: String
      },
      class: {type: String,
        required: true
      },
      grades: [gradeSchema]
})

studentSchema.pre<Istudent>('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  // השוואה בין הסיסמה שהמשתמש הזין לעומת ההצפנה
  studentSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, this.password)
  }
  export default mongoose.model<Istudent>("Students", studentSchema);
  