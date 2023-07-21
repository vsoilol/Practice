import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Subject } from 'src/app/core/models/responses/subject';

export const getAllSubjectsAction = createAction(ActionTypes.GET_SUBJECTS);

export const getAllSubjectsSuccessAction = createAction(
  ActionTypes.GET_SUBJECTS_SUCCESS,
  props<{ subjects: Subject[] }>()
);

export const getAllSubjectsFailureAction = createAction(
  ActionTypes.GET_SUBJECTS_FAILURE
);
