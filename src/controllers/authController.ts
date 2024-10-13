import { Request, Response } from "express";
import User from "../models/userModel"
import { generateToken } from "../utils/auth";
import { createUser } from "../services/userServices";

// פונקציה להרשמה של משתמש חדש
export const register = async (req: Request, res: Response) => {
    const user = req.body;

    try {
       
        const class2= await createUser(user);
        if(class2){
        // אם המשתמש הוא מנהל תייצר לו טוקן
        if (user.role == "teacher") {
            res.status(201).json({ message: "teacher you registered successfully" + class2})
        } else if(user.role == "student") {
            res.status(201).json({ message: "Student you were registered succsessfully" + class2})
        }}
        else{
            res.status(400).json({message: "could not add user"})
        }

    } catch (error) {
        console.log(error);
        res.status(400).json("תקלה בהרשמה")
    }
}


export const login = async (req: any, res: any) => {
    const { name, password } = req.body;

    const user = await User.findOne({ name });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "שם משתמש או סיסמה שגויים" })
    };

    // לעדכן מתי נכנס
    // user.lastLogin = new Date();
    // await user.save()

    const token = generateToken(user.id, user.role)
    res.cookie('token', token, {
        httpOnly:true,
        secure: false,
        maxAge: 3600000
    })
    res.status(201).json({ message: "התחברת בהצלחה", token })
}