import { Action, createReducer, on } from '@ngrx/store';
import { TeacherStateInterface } from '../types/teacherState.interface';
import {
  getAllTeachersAction,
  getAllTeachersFailureAction,
  getAllTeachersSuccessAction,
} from './actions/getAllTeachers.action';
import {
  createTeacherAction,
  createTeacherSuccessAction,
  createTeacherFailureAction,
} from './actions/createTeacher.action';
import {
  deleteTeacherSuccessAction,
  deleteTeacherFailureAction,
  deleteTeacherAction,
} from './actions/deleteTeacher.action';
import {
  updateTeacherAction,
  updateTeacherSuccessAction,
  updateTeacherFailureAction,
} from './actions/updateTeacher.action';

const initialState: TeacherStateInterface = {
  isLoading: false,
  teachers: [],
  isDeleteLoading: false,
  isEditLoading: false,
  errors: null,
};

const teacherReducer = createReducer(
  initialState,
  on(
    getAllTeachersAction,
    (state): TeacherStateInterface => ({
      ...state,
      isLoading: true,
      errors: null,
    })
  ),
  on(
    getAllTeachersSuccessAction,
    (state, action): TeacherStateInterface => ({
      ...state,
      isLoading: false,
      teachers: action.teachers,
    })
  ),
  on(
    getAllTeachersFailureAction,
    (state): TeacherStateInterface => ({
      ...state,
      isLoading: false,
      teachers: [],
    })
  ),
  on(
    deleteTeacherSuccessAction,
    deleteTeacherFailureAction,
    (state): TeacherStateInterface => ({
      ...state,
      isDeleteLoading: false,
    })
  ),
  on(
    deleteTeacherAction,
    (state): TeacherStateInterface => ({
      ...state,
      isDeleteLoading: true,
      errors: null,
    })
  ),
  on(
    updateTeacherAction,
    createTeacherAction,
    (state): TeacherStateInterface => ({
      ...state,
      isEditLoading: true,
      errors: null,
    })
  ),
  on(
    createTeacherSuccessAction,
    updateTeacherSuccessAction,
    (state): TeacherStateInterface => ({
      ...state,
      isEditLoading: false,
    })
  ),
  on(
    createTeacherFailureAction,
    updateTeacherFailureAction,
    (state): TeacherStateInterface => ({
      ...state,
      isEditLoading: false,
    })
  )
);

export function reducers(state: TeacherStateInterface, action: Action) {
  return teacherReducer(state, action);
}
