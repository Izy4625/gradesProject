import { Router } from "express";
import { addGradeController ,deleteGradeController, getAverageGradesController,updateScoreController } from "../controllers/teacherController";
import { authMiddleware } from "../middleware/authMiddleware";
import { errorHandler } from "../utils/errorHandler";

const teacherRouter = Router();
teacherRouter.get("/grades",authMiddleware, errorHandler(getAverageGradesController))
teacherRouter.post("/grades/:id", authMiddleware, errorHandler(addGradeController))
teacherRouter.delete("/grades/:id", authMiddleware, errorHandler(deleteGradeController))
teacherRouter.put("/grades/:id", authMiddleware,errorHandler(updateScoreController))


export default teacherRouter

