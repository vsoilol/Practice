import { Action, createReducer, on } from '@ngrx/store';
import { StudentStateInterface } from '../types/studentState.interface';
import {
  getAllStudentsAction,
  getAllStudentsFailureAction,
  getAllStudentsSuccessAction,
} from './actions/getAllStudents.action';
import {
  createStudentAction,
  createStudentFailureAction,
  createStudentSuccessAction,
} from './actions/createStudent.action';
import {
  updateStudentAction,
  updateStudentFailureAction,
  updateStudentSuccessAction,
} from './actions/updateStudent.action';
import {
  deleteStudentAction,
  deleteStudentFailureAction,
  deleteStudentSuccessAction,
} from './actions/deleteStudent.action';

const initialState: StudentStateInterface = {
  isLoading: false,
  students: [],
};

const studentReducer = createReducer(
  initialState,
  on(
    getAllStudentsAction,
    (state): StudentStateInterface => ({
      ...state,
      isLoading: true,
      students: [],
    })
  ),
  on(
    getAllStudentsSuccessAction,
    (state, action): StudentStateInterface => ({
      ...state,
      isLoading: false,
      students: action.students,
    })
  ),
  on(
    getAllStudentsFailureAction,
    (state): StudentStateInterface => ({
      ...state,
      isLoading: false,
      students: [],
    })
  ),
  on(
    createStudentAction,
    (state): StudentStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    createStudentSuccessAction,
    (state): StudentStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    createStudentFailureAction,
    (state): StudentStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    updateStudentAction,
    (state): StudentStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    updateStudentSuccessAction,
    (state): StudentStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    updateStudentFailureAction,
    (state): StudentStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    deleteStudentAction,
    (state): StudentStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    deleteStudentSuccessAction,
    (state): StudentStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    deleteStudentFailureAction,
    (state): StudentStateInterface => ({
      ...state,
      isLoading: false,
    })
  )
);

export function reducers(state: StudentStateInterface, action: Action) {
  return studentReducer(state, action);
}
