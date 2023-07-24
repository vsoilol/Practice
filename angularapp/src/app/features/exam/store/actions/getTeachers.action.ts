import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Teacher } from 'src/app/core/models/responses/teacher';

export const getTeachersAction = createAction(
  ActionTypes.GET_TEACHERS,
  props<{ date: Date }>()
);

export const getTeachersSuccessAction = createAction(
  ActionTypes.GET_TEACHERS_SUCCESS,
  props<{ teachers: Teacher[] }>()
);

export const getTeachersFailureAction = createAction(
  ActionTypes.GET_TEACHERS_FAILURE
);
