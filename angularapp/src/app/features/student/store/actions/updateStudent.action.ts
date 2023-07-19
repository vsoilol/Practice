import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { UpdateStudentRequest } from 'src/app/core/models/requests/student/updateStudentRequest';

export const updateStudentAction = createAction(
  ActionTypes.UPDATE_STUDENT,
  props<{ request: UpdateStudentRequest }>()
);

export const updateStudentSuccessAction = createAction(
  ActionTypes.UPDATE_STUDENT_SUCCESS
);

export const updateStudentFailureAction = createAction(
  ActionTypes.UPDATE_STUDENT_FAILURE
);
