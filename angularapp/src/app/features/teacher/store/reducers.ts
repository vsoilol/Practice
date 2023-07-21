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
import {
  getWorkingDaysByTeacherIdAction,
  getWorkingDaysByTeacherIdFailureAction,
  getWorkingDaysByTeacherIdSuccessAction,
} from './actions/getWorkingDaysByTeacherId.action';
import {
  updateTeacherWorkingDaysAction,
  updateTeacherWorkingDaysFailureAction,
  updateTeacherWorkingDaysSuccessAction,
} from './actions/updateTeacherWorkingDays.action';

const initialState: TeacherStateInterface = {
  isLoading: false,
  teachers: [],
  isDeleteLoading: false,
  isEditLoading: false,
  errors: null,
  workingDays: [],
  isUpdateWorkingDaysLoading: false,
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
  ),
  on(
    getWorkingDaysByTeacherIdAction,
    (state): TeacherStateInterface => ({
      ...state,
      isLoading: true,
      errors: null,
    })
  ),
  on(
    getWorkingDaysByTeacherIdSuccessAction,
    (state, action): TeacherStateInterface => ({
      ...state,
      workingDays: action.workingDays,
      isLoading: false,
      errors: null,
    })
  ),
  on(
    getWorkingDaysByTeacherIdFailureAction,
    (state): TeacherStateInterface => ({
      ...state,
      isLoading: false,
      errors: null,
    })
  ),
  on(
    updateTeacherWorkingDaysAction,
    (state): TeacherStateInterface => ({
      ...state,
      isUpdateWorkingDaysLoading: true,
      errors: null,
    })
  ),
  on(
    updateTeacherWorkingDaysFailureAction,
    updateTeacherWorkingDaysSuccessAction,
    (state): TeacherStateInterface => ({
      ...state,
      isUpdateWorkingDaysLoading: false,
      errors: null,
      workingDays: [],
    })
  )
);

export function reducers(state: TeacherStateInterface, action: Action) {
  return teacherReducer(state, action);
}
