import { Student } from 'src/app/core/models/responses/student';

export interface ExamStudentsInterface {
  examId: string;
  students: Student[];
}
