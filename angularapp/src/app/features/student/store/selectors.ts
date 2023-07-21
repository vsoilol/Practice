import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentStateInterface } from '../types/studentState.interface';

export const selectStudentFeature =
  createFeatureSelector<StudentStateInterface>('student');

export const selectIsStudentLoading = createSelector(
  selectStudentFeature,
  (studentState: StudentStateInterface) => studentState.isLoading
);

export const selectIsDeleteStudentLoading = createSelector(
  selectStudentFeature,
  (studentState: StudentStateInterface) => studentState.isDeleteLoading
);

export const selectIsEditStudentLoading = createSelector(
  selectStudentFeature,
  (studentState: StudentStateInterface) => studentState.isEditLoading
);

export const selectErrors = createSelector(
  selectStudentFeature,
  (studentState: StudentStateInterface) => studentState.errors
);

export const selectStudents = createSelector(
  selectStudentFeature,
  (studentState: StudentStateInterface) => studentState.students
);