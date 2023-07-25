import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { UpdateExamRequest } from 'src/app/core/models/requests/exam/updateExamRequest';

export const updateExamAction = createAction(
  ActionTypes.UPDATE_EXAM,
  props<{ request: UpdateExamRequest }>()
);

export const updateExamSuccessAction = createAction(
  ActionTypes.UPDATE_EXAM_SUCCESS
);

export const updateExamFailureAction = createAction(
  ActionTypes.UPDATE_EXAM_FAILURE
);
