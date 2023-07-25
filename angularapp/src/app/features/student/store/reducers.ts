import { Action, createReducer, on } from '@ngrx/store';
import { StudentStateInterface } from '../types/studentState.interface';
import {
  getAllStudentsAction,
  getAllStudentsFailureAction,
  getAllStudentsSuccessAction,
} from './actions/getAllStudents.action';
import {
  deleteStudentAction,
  deleteStudentFailureAction,
  deleteStudentSuccessAction,
} from './actions/deleteStudent.action';
import {
  updateStudentAction,
  updateStudentFailureAction,
  updateStudentSuccessAction,
} from './actions/updateStudent.action';
import {
  createStudentAction,
  createStudentFailureAction,
  createStudentSuccessAction,
} from './actions/createStudent.action';

const initialState: StudentStateInterface = {
  isLoading: false,
  students: [],
  isDeleteLoading: false,
  isEditLoading: false,
  errors: null,
};

const studentReducer = createReducer(
  initialState,
  on(
    getAllStudentsAction,
    (state): StudentStateInterface => ({
      ...state,
      isLoading: true,
      errors: null,
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
    deleteStudentSuccessAction,
    deleteStudentFailureAction,
    (state): StudentStateInterface => ({
      ...state,
      isDeleteLoading: false,
    })
  ),
  on(
    deleteStudentAction,
    (state): StudentStateInterface => ({
      ...state,
      isDeleteLoading: true,
      errors: null,
    })
  ),
  on(
    updateStudentAction,
    createStudentAction,
    (state): StudentStateInterface => ({
      ...state,
      isEditLoading: true,
      errors: null,
    })
  ),
  on(
    createStudentSuccessAction,
    updateStudentSuccessAction,
    (state): StudentStateInterface => ({
      ...state,
      isEditLoading: false,
    })
  ),
  on(
    createStudentFailureAction,
    updateStudentFailureAction,
    (state): StudentStateInterface => ({
      ...state,
      isEditLoading: false,
    })
  )
);

export function reducers(state: StudentStateInterface, action: Action) {
  return studentReducer(state, action);
}
