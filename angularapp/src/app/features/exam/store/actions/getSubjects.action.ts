import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Subject } from 'src/app/core/models/responses/subject';

export const getSubjectsAction = createAction(ActionTypes.GET_SUBJECTS);

export const getSubjectsSuccessAction = createAction(
  ActionTypes.GET_SUBJECTS_SUCCESS,
  props<{ subjects: Subject[] }>()
);

export const getSubjectsFailureAction = createAction(
  ActionTypes.GET_SUBJECTS_FAILURE
);
