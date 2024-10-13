import { Router } from "express";
import { addGradeController ,deleteGradeController } from "../controllers/teacherController";
import { authMiddleware } from "../middleware/authMiddleware";
import { errorHandler } from "../utils/errorHandler";

const teacherRouter = Router();
teacherRouter.get("")
teacherRouter.post("/grades/:id", authMiddleware, errorHandler(addGradeController))
teacherRouter.delete("/grades/:id", authMiddleware, errorHandler(deleteGradeController))


export default teacherRouter

