export class Course {
    id?: string;
    title: string;
    description: string;
    duration: string;
    instructor: string;
  
    constructor(id: string, title: string, description: string, duration: string, instructor: string) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.duration = duration;
      this.instructor = instructor;
    }
  }