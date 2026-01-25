export interface CourseModel {
  id: number;
  title: string;
  description: string;
  instructor_id: number;
  status: string;
  establishedTime: string;
  published: string;
  instructor_name: string;
  enrollment: {
    studied_hours: number;
  };
}
