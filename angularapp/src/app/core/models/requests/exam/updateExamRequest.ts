export interface UpdateExamRequest {
  id: string;
  subjectId: string;
  teacherId: string;
  date: string;
  studentIds: string[];
}
