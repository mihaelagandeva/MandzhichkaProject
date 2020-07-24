export interface Course {
  id: string;
  name: string;
  address: string;
  date: string;
  picturePath: string;
  duration: string;
  joined: boolean;
  canJoin: boolean;
}

export interface CourseReport {
  page: number;
  size: number;
  resultSet: Course[];
  totalItems: number;
}