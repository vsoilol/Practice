import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Student } from 'src/app/core/models/responses/student';

export const loadStudentsForExamAction = createAction(
  ActionTypes.LOAD_STUDENTS_FOR_EXAM,
  props<{ examId: string }>()
);

export const loadStudentsForExamSuccessAction = createAction(
  ActionTypes.LOAD_STUDENTS_FOR_EXAM_SUCCESS,
  props<{ examId: string; students: Student[] }>()
);

export const loadStudentsForExamFailureAction = createAction(
  ActionTypes.LOAD_STUDENTS_FOR_EXAM_FAILURE,
  props<{ examId: string }>()
);
