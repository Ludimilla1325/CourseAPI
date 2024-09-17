import express from "express";
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";
import { UserSchema } from "../schemas/UserSchema";
import * as yup from "yup";

export class UserController {
  userService: UserService;
  authService: AuthService;

  constructor(userService: UserService, authService: AuthService) {
    this.userService = userService;
    this.authService = authService;
  }

  async login(req: express.Request, res: express.Response): Promise<void> {
    const { username, password } = req.body;
    try {
      const token = await this.userService.login(username, password);
      if (!token) {
        res
          .status(401)
          .json({ success: false, message: "Invalid username or password" });
      }
      res
        .status(200)
        .json({ success: true, token, message: "Login successful" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async createUser(req: express.Request, res: express.Response): Promise<void> {
    const { username, password } = req.body;
    try {
      await UserSchema.validate(req.body);
      const user = await this.userService.createUser(username, password);
      res
        .status(201)
        .json({ success: true, user, message: "User created successfully" });
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        res.status(400).json({
          success: false,
          errors: error.errors,
          message: "Validation Error",
        });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
    }
  }

  getUsers(req: express.Request, res: express.Response): void {
    try {
      const users = this.userService.getUsers();
      res
        .status(200)
        .json({ success: true, users, message: "Users fetched successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  getUser(req: express.Request, res: express.Response): void {
    try {
      const user = this.userService.getUserById(req.params.id);
      if (user) {
        res
          .status(200)
          .json({ success: true, user, message: "User fetched successfully" });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  updateUser(req: express.Request, res: express.Response): void {
    const { newPassword } = req.body;
    try {
      const user = this.userService.updateUser(req.params.id, newPassword);
      if (user) {
        res
          .status(200)
          .json({ success: true, user, message: "User updated successfully" });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  deleteUser(req: express.Request, res: express.Response): void {
    try {
      const result = this.userService.deleteUser(req.params.id);
      if (result === "User not found") {
        res.status(404).json({ success: false, message: "User not found" });
      } else {
        res
          .status(200)
          .json({ success: true, message: "User deleted successfully" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}
