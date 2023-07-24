import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Exam } from 'src/app/core/models/responses/exam';

export const getAllExamsAction = createAction(ActionTypes.GET_EXAMS);

export const getAllExamsSuccessAction = createAction(
  ActionTypes.GET_EXAMS_SUCCESS,
  props<{ exams: Exam[] }>()
);

export const getAllExamsFailureAction = createAction(
  ActionTypes.GET_EXAMS_FAILURE
);
