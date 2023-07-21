import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const deleteSubjectAction = createAction(
  ActionTypes.DELETE_SUBJECT,
  props<{ id: string }>()
);

export const deleteSubjectSuccessAction = createAction(
  ActionTypes.DELETE_SUBJECT_SUCCESS
);

export const deleteSubjectFailureAction = createAction(
  ActionTypes.DELETE_SUBJECT_FAILURE
);
