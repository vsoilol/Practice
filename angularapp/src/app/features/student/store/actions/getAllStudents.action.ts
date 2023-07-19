import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { Student } from "src/app/core/models/responses/student";

export const getAllStudentsAction = createAction(ActionTypes.GET_STUDENTS);

export const getAllStudentsSuccessAction = createAction(
  ActionTypes.GET_STUDENTS_SUCCESS,
  props<{ students: Student[] }>()
);

export const getAllStudentsFailureAction = createAction(
  ActionTypes.GET_STUDENTS_FAILURE
);