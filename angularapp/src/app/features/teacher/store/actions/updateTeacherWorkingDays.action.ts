import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { UpdateTeacherWorkingDaysRequest } from 'src/app/core/models/requests/teacher/updateTeacherWorkingDaysRequest';

export const updateTeacherWorkingDaysAction = createAction(
  ActionTypes.UPDATE_TEACHER_WORKING_DAYS,
  props<{ request: UpdateTeacherWorkingDaysRequest }>()
);

export const updateTeacherWorkingDaysSuccessAction = createAction(
  ActionTypes.UPDATE_TEACHER_WORKING_DAYS_SUCCESS
);

export const updateTeacherWorkingDaysFailureAction = createAction(
  ActionTypes.UPDATE_TEACHER_WORKING_DAYS_FAILURE
);
