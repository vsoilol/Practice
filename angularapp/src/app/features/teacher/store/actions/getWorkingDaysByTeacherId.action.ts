import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { WorkingDay } from 'src/app/core/models/responses/workingDay';

export const getWorkingDaysByTeacherIdAction = createAction(
  ActionTypes.GET_WORKING_DAYS_BY_TEACHER,
  props<{ teacherId: string }>()
);

export const getWorkingDaysByTeacherIdSuccessAction = createAction(
  ActionTypes.GET_WORKING_DAYS_BY_TEACHER_SUCCESS,
  props<{ workingDays: WorkingDay[] }>()
);

export const getWorkingDaysByTeacherIdFailureAction = createAction(
  ActionTypes.GET_WORKING_DAYS_BY_TEACHER_FAILURE
);
