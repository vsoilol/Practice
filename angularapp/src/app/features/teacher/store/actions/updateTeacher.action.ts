import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { UpdateTeacherRequest } from 'src/app/core/models/requests/teacher/updateTeacherRequest';

export const updateTeacherAction = createAction(
  ActionTypes.UPDATE_TEACHER,
  props<{ request: UpdateTeacherRequest }>()
);

export const updateTeacherSuccessAction = createAction(
  ActionTypes.UPDATE_TEACHER_SUCCESS
);

export const updateTeacherFailureAction = createAction(
  ActionTypes.UPDATE_TEACHER_FAILURE
);
