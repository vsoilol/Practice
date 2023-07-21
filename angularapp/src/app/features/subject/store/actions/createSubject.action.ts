import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { CreateSubjectRequest } from 'src/app/core/models/requests/subject/createSubjectRequest';

export const createSubjectAction = createAction(
  ActionTypes.CREATE_SUBJECT,
  props<{ request: CreateSubjectRequest }>()
);

export const createSubjectSuccessAction = createAction(
  ActionTypes.CREATE_SUBJECT_SUCCESS
);

export const createSubjectFailureAction = createAction(
  ActionTypes.CREATE_SUBJECT_FAILURE
);
