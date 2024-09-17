import { Course } from "../models/Course";
import { CourseService } from "./CourseService";


describe('CourseService', () => {
  let courseService: CourseService;

  beforeEach(() => {
    courseService = new CourseService();
  });

  describe('createCourse', () => {
    it('should create a new course', () => {
      const course: Course = { duration: '10:00', instructor: 'instructor', title: 'Test Course', description: 'Test Description' };
      const createdCourse = courseService.createCourse(course);
      expect(createdCourse).toHaveProperty('id');
      expect(createdCourse).toHaveProperty('title', 'Test Course');
      expect(createdCourse).toHaveProperty('description', 'Test Description');
    });
  });

  describe('getCourses', () => {
    it('should return all courses', () => {
        const course1: Course = { duration: '10:00', instructor: 'instructor', title: 'Test Course 1', description: 'Test Description' };
        const course2: Course = { duration: '10:00', instructor: 'instructor', title: 'Test Course 2', description: 'Test Description' };
      courseService.createCourse(course1);
      courseService.createCourse(course2);
      const courses = courseService.getCourses();
      expect(courses).toHaveLength(2);
    });

    it('should return all courses when no filter is provided', () => {
       let service = new CourseService();
        service.createCourse({ id: '1', title: 'Course 1', description: 'Description 1', duration: "120", instructor: 'Instructor 1' });
        service.createCourse({ id: '2', title: 'Course 2', description: 'Description 2', duration: "240", instructor: 'Instructor 2' });
        service.createCourse({ id: '3', title: 'Course 3', description: 'Description 3', duration: "360", instructor: 'Instructor 3' });
        const courses = service.getCourses();
        expect(courses.length).toBe(3);
      });
    
      it('should return courses that match the filter', () => {
        let service = new CourseService();
        service.createCourse({ id: '1', title: 'Course 1', description: 'Description 1', duration: "120", instructor: 'Instructor 1' });
        service.createCourse({ id: '2', title: 'Course 2', description: 'Description 2', duration: "240", instructor: 'Instructor 2' });
        service.createCourse({ id: '3', title: 'Course 3', description: 'Description 3', duration: "360", instructor: 'Instructor 3' });
        const courses = service.getCourses({ title: 'Course 1' });
        expect(courses.length).toBe(1);
        expect(courses[0].title).toBe('Course 1');
      });
    
      it('should return an empty array when no courses match the filter', () => {
        let service = new CourseService();
        service.createCourse({ id: '1', title: 'Course 1', description: 'Description 1', duration: "120", instructor: 'Instructor 1' });
        service.createCourse({ id: '2', title: 'Course 2', description: 'Description 2', duration: "240", instructor: 'Instructor 2' });
        service.createCourse({ id: '3', title: 'Course 3', description: 'Description 3', duration: "360", instructor: 'Instructor 3' });
        const courses = service.getCourses({ title: 'Nonexistent Course' });
        expect(courses.length).toBe(0);
      });
  });

  describe('getCourse', () => {
    it('should return the course with the given id', () => {
        const course: Course = { duration: '10:00', instructor: 'instructor', title: 'Test Course', description: 'Test Description' };
      const createdCourse = courseService.createCourse(course);
      if(createdCourse.id) {
          const fetchedCourse = courseService.getCourse(createdCourse.id);
          expect(fetchedCourse).toEqual(createdCourse);
      }
    });
  });

  describe('updateCourse', () => {
    it('should update the course with the given id', () => {
        const course: Course = { duration: '10:00', instructor: 'instructor', title: 'Test Course', description: 'Test Description' };
        const createdCourse = courseService.createCourse(course);
        if(createdCourse.id) {
            const updatedCourse = courseService.updateCourse(createdCourse.id, { title: 'Updated Course' });
            expect(updatedCourse).toHaveProperty('title', 'Updated Course');
        }
    });
  });

  describe('deleteCourse', () => {
    it('should delete the course with the given id', () => {
        const course: Course = { duration: '10:00', instructor: 'instructor', title: 'Test Course', description: 'Test Description' };
        const createdCourse = courseService.createCourse(course);
        if(createdCourse.id) {
            courseService.deleteCourse(createdCourse.id);
            const fetchedCourse = courseService.getCourse(createdCourse.id);
            expect(fetchedCourse).toBeUndefined();
        }
    });

    it('should return "Course not found!" if the course does not exist', () => {
      const response = courseService.deleteCourse('nonexistent');
      expect(response).toBe('Course not found!');
    });
  });
});