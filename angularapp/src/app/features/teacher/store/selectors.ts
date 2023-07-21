import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeacherStateInterface } from '../types/teacherState.interface';

export const selectTeacherFeature =
  createFeatureSelector<TeacherStateInterface>('teacher');

export const selectIsLoading = createSelector(
  selectTeacherFeature,
  (tecaherState: TeacherStateInterface) => tecaherState.isLoading
);

export const selectWorkingDays = createSelector(
  selectTeacherFeature,
  (tecaherState: TeacherStateInterface) => tecaherState.workingDays
);

export const selectWorkingDaysWithoutId = createSelector(
  selectTeacherFeature,
  (tecaherState: TeacherStateInterface) =>
    tecaherState.workingDays.map(_ => _.date)
);

export const selectIsDeleteTeacherLoading = createSelector(
  selectTeacherFeature,
  (tecaherState: TeacherStateInterface) => tecaherState.isDeleteLoading
);

export const selectIsEditTeacherLoading = createSelector(
  selectTeacherFeature,
  (tecaherState: TeacherStateInterface) => tecaherState.isEditLoading
);

export const selectErrors = createSelector(
  selectTeacherFeature,
  (tecaherState: TeacherStateInterface) => tecaherState.errors
);

export const selectTeachers = createSelector(
  selectTeacherFeature,
  (tecaherState: TeacherStateInterface) => tecaherState.teachers
);

export const selectIsUpdateWorkingDaysLoading = createSelector(
  selectTeacherFeature,
  (tecaherState: TeacherStateInterface) => tecaherState.isUpdateWorkingDaysLoading
);
