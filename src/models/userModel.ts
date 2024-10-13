import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";



export interface IUser extends Document  {
        name: string,
        email: string,
        password: string,
        class: string
        role: "student" | "teacher"
           
}


const userSchema = new Schema<IUser> ({
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
   
})

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  // השוואה בין הסיסמה שהמשתמש הזין לעומת ההצפנה
  userSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, this.password)
  }
  export default mongoose.model<IUser>("Students", userSchema);
  