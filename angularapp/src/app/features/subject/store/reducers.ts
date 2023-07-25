import { Action, createReducer, on } from '@ngrx/store';
import { SubjectStateInterface } from '../types/subjectState.interface';
import {
  createSubjectAction,
  createSubjectSuccessAction,
  createSubjectFailureAction,
} from './actions/createSubject.action';
import {
  deleteSubjectSuccessAction,
  deleteSubjectFailureAction,
  deleteSubjectAction,
} from './actions/deleteSubject.action';
import {
  getAllSubjectsAction,
  getAllSubjectsSuccessAction,
  getAllSubjectsFailureAction,
} from './actions/getAllSubjects.action';
import {
  updateSubjectAction,
  updateSubjectSuccessAction,
  updateSubjectFailureAction,
} from './actions/updateSubject.action';

const initialState: SubjectStateInterface = {
  isLoading: false,
  subjects: [],
  isDeleteLoading: false,
  isEditLoading: false,
  errors: null,
};

const subjectReducer = createReducer(
  initialState,
  on(
    getAllSubjectsAction,
    (state): SubjectStateInterface => ({
      ...state,
      isLoading: true,
      errors: null,
    })
  ),
  on(
    getAllSubjectsSuccessAction,
    (state, action): SubjectStateInterface => ({
      ...state,
      isLoading: false,
      subjects: action.subjects,
    })
  ),
  on(
    getAllSubjectsFailureAction,
    (state): SubjectStateInterface => ({
      ...state,
      isLoading: false,
      subjects: [],
    })
  ),
  on(
    deleteSubjectSuccessAction,
    deleteSubjectFailureAction,
    (state): SubjectStateInterface => ({
      ...state,
      isDeleteLoading: false,
    })
  ),
  on(
    deleteSubjectAction,
    (state): SubjectStateInterface => ({
      ...state,
      isDeleteLoading: true,
      errors: null,
    })
  ),
  on(
    updateSubjectAction,
    createSubjectAction,
    (state): SubjectStateInterface => ({
      ...state,
      isEditLoading: true,
      errors: null,
    })
  ),
  on(
    createSubjectSuccessAction,
    updateSubjectSuccessAction,
    (state): SubjectStateInterface => ({
      ...state,
      isEditLoading: false,
    })
  ),
  on(
    createSubjectFailureAction,
    updateSubjectFailureAction,
    (state): SubjectStateInterface => ({
      ...state,
      isEditLoading: false,
    })
  )
);

export function reducers(state: SubjectStateInterface, action: Action) {
  return subjectReducer(state, action);
}
