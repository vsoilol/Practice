import { Teacher } from './teacher';

export interface SubjectBrief {
  id: string;
  title: string;
}

export interface ExamBackend {
  id: string;
  date: string;
  teacher: Teacher;
  subject: SubjectBrief;
}

export interface Exam {
  id: string;
  date: Date;
  teacher: Teacher;
  subject: SubjectBrief;
}
