import express from "express";
import { CourseController } from "../controllers/CourseController";
import { CourseService } from "../services/CourseService";
import { authenticateToken } from "../middlewares/AuthenticationMiddleware";

const router = express.Router();
const courseService = new CourseService();
const courseController = new CourseController(courseService);

router.post('/courses', authenticateToken as any, courseController.createCourse.bind(courseController));
router.get('/courses', authenticateToken as any, courseController.getCourses.bind(courseController));
router.get('/courses/:id', authenticateToken as any, courseController.getCourseById.bind(courseController));
router.put('/courses/:id', authenticateToken as any, courseController.updateCourse.bind(courseController));
router.delete('/courses/:id', authenticateToken as any, courseController.deleteCourse.bind(courseController));

export default router;