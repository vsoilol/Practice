import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Teacher } from 'src/app/core/models/responses/teacher';

export const getAllTeachersAction = createAction(ActionTypes.GET_TEACHERS);

export const getAllTeachersSuccessAction = createAction(
  ActionTypes.GET_TEACHERS_SUCCESS,
  props<{ teachers: Teacher[] }>()
);

export const getAllTeachersFailureAction = createAction(
  ActionTypes.GET_TEACHERS_FAILURE
);
