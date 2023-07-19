import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentStateInterface } from '../types/studentState.interface';

export const selectStudentFeature =
  createFeatureSelector<StudentStateInterface>('student');

export const selectIsStudentLoading = createSelector(
  selectStudentFeature,
  (studentState: StudentStateInterface) => studentState.isLoading
);

export const selectStudents = createSelector(
  selectStudentFeature,
  (studentState: StudentStateInterface) => studentState.students
);
