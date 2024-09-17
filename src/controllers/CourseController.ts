import express from "express";
import { CourseService } from "../services/CourseService";
import { Course } from "../models/Course";
import { CourseSchema } from "../schemas/CourseSchema";
import * as yup from "yup";

export class CourseController {
  courseService: CourseService;

  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  async createCourse(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      await CourseSchema.validate(req.body);
      const { id, title, description, duration, instructor } = req.body;
      const course = this.courseService.createCourse(
        new Course(id, title, description, duration, instructor)
      );
      res.status(201).json({
        success: true,
        course,
        message: "Course created successfully",
      });
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

  async getCourses(req: express.Request, res: express.Response): Promise<void> {
    try {
      const courses = await this.courseService.getCourses(req.query);
      res.status(200).json({
        success: true,
        courses,
        message: "Courses fetched successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async getCourseById(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const course = await this.courseService.getCourse(req.params.id);
      if (course) {
        res.status(200).json({
          success: true,
          course,
          message: "Course fetched successfully",
        });
      } else {
        res.status(404).json({ success: false, message: "Course not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async updateCourse(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const course = await this.courseService.updateCourse(
        req.params.id,
        req.body
      );
      if (course) {
        res.status(200).json({
          success: true,
          course,
          message: "Course updated successfully",
        });
      } else {
        res.status(404).json({ success: false, message: "Course not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async deleteCourse(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const result = await this.courseService.deleteCourse(req.params.id);
      if (result === "Course not found!") {
        res.status(404).json({ success: false, message: "Course not found" });
      } else {
        res
          .status(200)
          .json({ success: true, message: "Course deleted successfully" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}
