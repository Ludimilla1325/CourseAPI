import { Course } from "../models/Course";
import { v4 as uuidv4 } from "uuid";

export class CourseService {
  private courses: Course[] = [];

  createCourse(course: Course): Course {
    course.id = uuidv4();
    this.courses.push(course);
    return course;
  }

  getCourses(filter?: Partial<Course>): Course[] {
    let filteredCourses: Course[] = [...this.courses];
    const validKeys: (keyof Course)[] = [
      "id",
      "title",
      "description",
      "duration",
      "instructor",
    ];

    if (filter) {
      Object.keys(filter).forEach((key: string) => {
        if (validKeys.includes(key as keyof Course)) {
          filteredCourses = filteredCourses.filter(
            (course: Course) =>
              String(course[key as keyof Course]) ===
              String(filter[key as keyof Course])
          );
        }
      });
    }

    return filteredCourses;
  }

  getCourse(id: string): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }

  updateCourse(id: string, updatedCourse: Partial<Course>): Course | undefined {
    const course = this.getCourse(id);
    if (course) {
      Object.assign(course, updatedCourse);
    }
    return course;
  }

  deleteCourse(id: string): void | string {
    const course = this.getCourse(id);
    if (!course) return "Course not found!";
    this.courses = this.courses.filter((course) => course.id !== id);
    return "Course deleted successfully";
  }
}
