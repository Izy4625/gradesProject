import { Router } from "express";
import { addGradeController } from "../controllers/teacherController";
import { authMiddleware } from "../middleware/authMiddleware";
import { errorHandler } from "../utils/errorHandler";

const teacherRouter = Router();
teacherRouter.get("")
teacherRouter.post("/grades/:id", authMiddleware, errorHandler(addGradeController))


export default teacherRouter

