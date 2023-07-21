import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { UpdateSubjectRequest } from 'src/app/core/models/requests/subject/updateSubjectRequest';

export const updateSubjectAction = createAction(
  ActionTypes.UPDATE_SUBJECT,
  props<{ request: UpdateSubjectRequest }>()
);

export const updateSubjectSuccessAction = createAction(
  ActionTypes.UPDATE_SUBJECT_SUCCESS
);

export const updateSubjectFailureAction = createAction(
  ActionTypes.UPDATE_SUBJECT_FAILURE
);
