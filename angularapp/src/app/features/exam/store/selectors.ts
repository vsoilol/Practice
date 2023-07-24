import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExamStateInterface } from '../types/examState.interface';

export const selectExamFeature =
  createFeatureSelector<ExamStateInterface>('exam');

export const selectIsLoading = createSelector(
  selectExamFeature,
  (examState: ExamStateInterface) => examState.isLoading
);

export const selectStudentsByExam = createSelector(
  selectExamFeature,
  state => state.studentsByExam
);

export const selectLoadingStudents = createSelector(
  selectExamFeature,
  state => state.loadingStudents
);

export const selectIsDeleteExamLoading = createSelector(
  selectExamFeature,
  (examState: ExamStateInterface) => examState.isDeleteLoading
);

export const selectIsEditExamLoading = createSelector(
  selectExamFeature,
  (examState: ExamStateInterface) => examState.isEditLoading
);

export const selectErrors = createSelector(
  selectExamFeature,
  (examState: ExamStateInterface) => examState.errors
);

export const selectExams = createSelector(
  selectExamFeature,
  (examState: ExamStateInterface) => examState.exams
);

export const selectSubjects = createSelector(
  selectExamFeature,
  (examState: ExamStateInterface) => examState.subjects
);

export const selectTeachers = createSelector(
  selectExamFeature,
  (examState: ExamStateInterface) => examState.teachers
);

export const selectStudents = createSelector(
  selectExamFeature,
  (examState: ExamStateInterface) => examState.students
);

export const selectIsTeachersLoading = createSelector(
  selectExamFeature,
  (examState: ExamStateInterface) => examState.isTeachersLoading
);

export const selectIsSubjectsLoading = createSelector(
  selectExamFeature,
  (examState: ExamStateInterface) => examState.isSubjectsLoading
);

export const selectIsStudentsLoading = createSelector(
  selectExamFeature,
  (examState: ExamStateInterface) => examState.isStudentsLoading
);
