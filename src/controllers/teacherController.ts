import { Request, Response, NextFunction } from "express";
 import { addGrade, deleteGrade, getAverageGrades } from "../services/userServices";
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

 export const  deleteGradeController = async(req:AuthRequest, res: Response) =>{

    const  studenid = req.params.id as unknown as Types.ObjectId
    const teacherid = req.user?.userId as unknown as Types.ObjectId

    const updatedGrades = await deleteGrade(studenid,teacherid,req.body)
    console.log(updatedGrades)

    if(!updatedGrades){res.status(404).json({message: "couldnt delete the grade"})}

    res.status(200).json({message: 'succssefully deleted grade' + updatedGrades})
 }

 export const getAverageGradesController = async(req: AuthRequest, res: Response) =>{
    const teacherid = req.user?.userId as unknown as Types.ObjectId;
    const average = await getAverageGrades(teacherid);

    if(!average){res.status(400).json({message: "could not get the average"})}
    res.status(200).json({message: "this is the average of all the grades in your class" + average})
 }