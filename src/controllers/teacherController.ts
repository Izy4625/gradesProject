import { Request, Response, NextFunction } from "express";
 import { addGrade } from "../services/userServices";
 import { Iklass } from "../models/classModel";
 import {AuthRequest } from "../middleware/authMiddleware"
 import {Types } from "mongoose"

 export const addGradeController = async(req:AuthRequest, res: Response) =>{
    const  studenid = req.params.id as unknown as Types.ObjectId
    const teacherid = req.user?.userId as unknown as Types.ObjectId

    const updatedGrades = await addGrade(studenid,teacherid,req.body)

    if(!updatedGrades){res.status(404).json({message: "couldnt add the grade"})}

    res.status(200).json({message: 'succssefully add grade' + updatedGrades})
 }