import express from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import { AuthService } from "../services/AuthService";
import { authenticateToken } from "../middlewares/AuthenticationMiddleware";

const router = express.Router();
const userService = new UserService(); 
const secretKey = process.env.SECRET_KEY || '';
const authService = new AuthService(secretKey);
const userController = new UserController(userService, authService); 

router.post('/login', userController.login.bind(userController));
router.post('/users', userController.createUser.bind(userController));
router.get('/users', authenticateToken as any, userController.getUsers.bind(userController));
router.get('/users/:id', authenticateToken as any, userController.getUser.bind(userController));
router.put('/users/:id', authenticateToken as any, userController.updateUser.bind(userController));
router.delete('/users/:id', authenticateToken as any, userController.deleteUser.bind(userController))

export default router;