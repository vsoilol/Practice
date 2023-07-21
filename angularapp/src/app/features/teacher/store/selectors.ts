import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeacherStateInterface } from '../types/teacherState.interface';

export const selectTeacherFeature =
  createFeatureSelector<TeacherStateInterface>('teacher');

export const selectIsLoading = createSelector(
  selectTeacherFeature,
  (teacherState: TeacherStateInterface) => teacherState.isLoading
);

export const selectWorkingDays = createSelector(
  selectTeacherFeature,
  (teacherState: TeacherStateInterface) => teacherState.workingDays
);

export const selectWorkingDaysWithoutId = createSelector(
  selectTeacherFeature,
  (teacherState: TeacherStateInterface) =>
    teacherState.workingDays.map(_ => _.date)
);

export const selectIsDeleteTeacherLoading = createSelector(
  selectTeacherFeature,
  (teacherState: TeacherStateInterface) => teacherState.isDeleteLoading
);

export const selectIsEditTeacherLoading = createSelector(
  selectTeacherFeature,
  (teacherState: TeacherStateInterface) => teacherState.isEditLoading
);

export const selectErrors = createSelector(
  selectTeacherFeature,
  (teacherState: TeacherStateInterface) => teacherState.errors
);

export const selectTeachers = createSelector(
  selectTeacherFeature,
  (teacherState: TeacherStateInterface) => teacherState.teachers
);

export const selectIsUpdateWorkingDaysLoading = createSelector(
  selectTeacherFeature,
  (teacherState: TeacherStateInterface) => teacherState.isUpdateWorkingDaysLoading
);
