import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const deleteExamAction = createAction(
  ActionTypes.DELETE_EXAM,
  props<{ id: string }>()
);

export const deleteExamSuccessAction = createAction(
  ActionTypes.DELETE_EXAM_SUCCESS
);

export const deleteExamFailureAction = createAction(
  ActionTypes.DELETE_EXAM_FAILURE
);
