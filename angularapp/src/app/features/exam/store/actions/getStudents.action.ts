import { createAction, props } from '@ngrx/store';
import { Student } from 'src/app/core/models/responses/student';
import { ActionTypes } from '../actionTypes';

export const getStudentsAction = createAction(ActionTypes.GET_STUDENTS);

export const getStudentsSuccessAction = createAction(
  ActionTypes.GET_STUDENTS_SUCCESS,
  props<{ students: Student[] }>()
);

export const getStudentsFailureAction = createAction(
  ActionTypes.GET_STUDENTS_FAILURE
);
