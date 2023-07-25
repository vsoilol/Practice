import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { CreateExamRequest } from 'src/app/core/models/requests/exam/createExamRequest';

export const createExamAction = createAction(
  ActionTypes.CREATE_EXAM,
  props<{ request: CreateExamRequest }>()
);

export const createExamSuccessAction = createAction(
  ActionTypes.CREATE_EXAM_SUCCESS
);

export const createExamFailureAction = createAction(
  ActionTypes.CREATE_EXAM_FAILURE
);
