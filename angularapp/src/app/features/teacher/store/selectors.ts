import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeacherStateInterface } from '../types/teacherState.interface';

export const selectStudentFeature =
  createFeatureSelector<TeacherStateInterface>('teacher');

export const selectIsLoading = createSelector(
  selectStudentFeature,
  (tecaherState: TeacherStateInterface) => tecaherState.isLoading
);

export const selectWorkingDays = createSelector(
  selectStudentFeature,
  (tecaherState: TeacherStateInterface) => tecaherState.workingDays
);

export const selectWorkingDaysWithoutId = createSelector(
  selectStudentFeature,
  (tecaherState: TeacherStateInterface) =>
    tecaherState.workingDays.map(_ => _.date)
);

export const selectIsDeleteTeacherLoading = createSelector(
  selectStudentFeature,
  (tecaherState: TeacherStateInterface) => tecaherState.isDeleteLoading
);

export const selectIsEditTeacherLoading = createSelector(
  selectStudentFeature,
  (tecaherState: TeacherStateInterface) => tecaherState.isEditLoading
);

export const selectErrors = createSelector(
  selectStudentFeature,
  (tecaherState: TeacherStateInterface) => tecaherState.errors
);

export const selectTeachers = createSelector(
  selectStudentFeature,
  (tecaherState: TeacherStateInterface) => tecaherState.teachers
);

export const selectIsUpdateWorkingDaysLoading = createSelector(
  selectStudentFeature,
  (tecaherState: TeacherStateInterface) => tecaherState.isUpdateWorkingDaysLoading
);
