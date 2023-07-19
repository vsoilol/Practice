import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { CreateStudentRequest } from 'src/app/core/models/requests/student/createStudentRequest';

export const createStudentAction = createAction(
  ActionTypes.CREATE_STUDENT,
  props<{ request: CreateStudentRequest }>()
);

export const createStudentSuccessAction = createAction(
  ActionTypes.CREATE_STUDENT_SUCCESS
);

export const createStudentFailureAction = createAction(
  ActionTypes.CREATE_STUDENT_FAILURE
);
