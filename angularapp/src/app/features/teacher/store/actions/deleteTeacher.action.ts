import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const deleteTeacherAction = createAction(
  ActionTypes.DELETE_TEACHER,
  props<{ id: string }>()
);

export const deleteTeacherSuccessAction = createAction(
  ActionTypes.DELETE_TEACHER_SUCCESS
);

export const deleteTeacherFailureAction = createAction(
  ActionTypes.DELETE_TEACHER_FAILURE
);
