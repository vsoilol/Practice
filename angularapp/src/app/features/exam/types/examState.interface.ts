import { Exam } from 'src/app/core/models/responses/exam';
import { Student } from 'src/app/core/models/responses/student';
import { Subject } from 'src/app/core/models/responses/subject';
import { Teacher } from 'src/app/core/models/responses/teacher';

export interface ExamStateInterface {
  isLoading: boolean;
  isDeleteLoading: boolean;
  isEditLoading: boolean;
  exams: Exam[];
  errors: string[] | null;
  studentsByExam: { [examId: string]: Student[] };
  loadingStudents: { [examId: string]: boolean };
  teachers: Teacher[],
  subjects: Subject[],
  students: Student[],
  isTeachersLoading: boolean,
  isSubjectsLoading: boolean,
  isStudentsLoading: boolean
}
