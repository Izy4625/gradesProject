import { Router } from "express";

const teacherRouter = Router();
teacherRouter.post("/register", registerTeacher)

export default teacherRouter