import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const deleteStudentAction = createAction(
  ActionTypes.DELETE_STUDENT,
  props<{ id: string }>()
);

export const deleteStudentSuccessAction = createAction(
  ActionTypes.DELETE_STUDENT_SUCCESS
);

export const deleteStudentFailureAction = createAction(
  ActionTypes.DELETE_STUDENT_FAILURE
);
