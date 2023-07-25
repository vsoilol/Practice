import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { CreateTeacherRequest } from 'src/app/core/models/requests/teacher/createTeacherRequest';

export const createTeacherAction = createAction(
  ActionTypes.CREATE_TEACHER,
  props<{ request: CreateTeacherRequest }>()
);

export const createTeacherSuccessAction = createAction(
  ActionTypes.CREATE_TEACHER_SUCCESS
);

export const createTeacherFailureAction = createAction(
  ActionTypes.CREATE_TEACHER_FAILURE
);
