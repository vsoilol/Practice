import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SubjectStateInterface } from '../types/subjectState.interface';

export const selectSubjectFeature =
  createFeatureSelector<SubjectStateInterface>('subject');

export const selectIsLoading = createSelector(
  selectSubjectFeature,
  (subjectState: SubjectStateInterface) => subjectState.isLoading
);

export const selectIsDeleteSubjectLoading = createSelector(
  selectSubjectFeature,
  (subjectState: SubjectStateInterface) => subjectState.isDeleteLoading
);

export const selectIsEditSubjectLoading = createSelector(
  selectSubjectFeature,
  (subjectState: SubjectStateInterface) => subjectState.isEditLoading
);

export const selectErrors = createSelector(
  selectSubjectFeature,
  (subjectState: SubjectStateInterface) => subjectState.errors
);

export const selectSubjects = createSelector(
  selectSubjectFeature,
  (subjectState: SubjectStateInterface) => subjectState.subjects
);
