import { Action, createReducer, on } from '@ngrx/store';
import { ExamStateInterface } from '../types/examState.interface';
import {
  getAllExamsAction,
  getAllExamsFailureAction,
  getAllExamsSuccessAction,
} from './actions/getAllExams.action';
import {
  createExamAction,
  createExamSuccessAction,
  createExamFailureAction,
} from './actions/createExam.action';
import {
  deleteExamSuccessAction,
  deleteExamFailureAction,
  deleteExamAction,
} from './actions/deleteExam.action';
import {
  updateExamAction,
  updateExamSuccessAction,
  updateExamFailureAction,
} from './actions/updateExam.action';
import {
  loadStudentsForExamAction,
  loadStudentsForExamFailureAction,
  loadStudentsForExamSuccessAction,
} from './actions/loadStudentsForExam.action';
import {
  getTeachersAction,
  getTeachersFailureAction,
  getTeachersSuccessAction,
} from './actions/getTeachers.action';
import {
  getSubjectsAction,
  getSubjectsFailureAction,
  getSubjectsSuccessAction,
} from './actions/getSubjects.action';
import { getStudentsAction, getStudentsFailureAction, getStudentsSuccessAction } from './actions/getStudents.action';

const initialState: ExamStateInterface = {
  isLoading: false,
  exams: [],
  isDeleteLoading: false,
  isEditLoading: false,
  errors: null,
  studentsByExam: {},
  loadingStudents: {},
  subjects: [],
  teachers: [],
  students: [],
  isSubjectsLoading: false,
  isTeachersLoading: false,
  isStudentsLoading: false,
};

const examReducer = createReducer(
  initialState,
  on(
    getAllExamsAction,
    (state): ExamStateInterface => ({
      ...state,
      isLoading: true,
      errors: null,
    })
  ),
  on(
    getAllExamsSuccessAction,
    (state, action): ExamStateInterface => ({
      ...state,
      isLoading: false,
      exams: action.exams,
    })
  ),
  on(
    getAllExamsFailureAction,
    (state): ExamStateInterface => ({
      ...state,
      isLoading: false,
      exams: [],
    })
  ),
  on(
    deleteExamSuccessAction,
    deleteExamFailureAction,
    (state): ExamStateInterface => ({
      ...state,
      isDeleteLoading: false,
    })
  ),
  on(
    deleteExamAction,
    (state): ExamStateInterface => ({
      ...state,
      isDeleteLoading: true,
      errors: null,
    })
  ),
  on(
    updateExamAction,
    createExamAction,
    (state): ExamStateInterface => ({
      ...state,
      isEditLoading: true,
      errors: null,
    })
  ),
  on(
    createExamSuccessAction,
    updateExamSuccessAction,
    (state): ExamStateInterface => ({
      ...state,
      isEditLoading: false,
    })
  ),
  on(
    createExamFailureAction,
    updateExamFailureAction,
    (state): ExamStateInterface => ({
      ...state,
      isEditLoading: false,
    })
  ),
  on(
    createExamFailureAction,
    (state): ExamStateInterface => ({
      ...state,
      isEditLoading: false,
    })
  ),
  on(
    loadStudentsForExamAction,
    (state, action): ExamStateInterface => ({
      ...state,
      loadingStudents: { ...state.loadingStudents, [action.examId]: true },
    })
  ),
  on(
    loadStudentsForExamSuccessAction,
    (state, action): ExamStateInterface => ({
      ...state,
      studentsByExam: {
        ...state.studentsByExam,
        [action.examId]: action.students,
      },
      loadingStudents: { ...state.loadingStudents, [action.examId]: false },
    })
  ),
  on(
    loadStudentsForExamFailureAction,
    (state, action): ExamStateInterface => ({
      ...state,
      loadingStudents: { ...state.loadingStudents, [action.examId]: false },
    })
  ),
  on(
    getTeachersAction,
    (state): ExamStateInterface => ({
      ...state,
      isTeachersLoading: true,
    })
  ),
  on(
    getTeachersSuccessAction,
    (state, action): ExamStateInterface => ({
      ...state,
      isTeachersLoading: false,
      teachers: action.teachers,
    })
  ),
  on(
    getTeachersFailureAction,
    (state): ExamStateInterface => ({
      ...state,
      isTeachersLoading: false,
    })
  ),
  on(
    getSubjectsAction,
    (state): ExamStateInterface => ({
      ...state,
      isSubjectsLoading: true,
    })
  ),
  on(
    getSubjectsSuccessAction,
    (state, action): ExamStateInterface => ({
      ...state,
      isSubjectsLoading: false,
      subjects: action.subjects,
    })
  ),
  on(
    getSubjectsFailureAction,
    (state): ExamStateInterface => ({
      ...state,
      isSubjectsLoading: false,
    })
  ),
  on(
    getStudentsAction,
    (state): ExamStateInterface => ({
      ...state,
      isStudentsLoading: true,
    })
  ),
  on(
    getStudentsSuccessAction,
    (state, action): ExamStateInterface => ({
      ...state,
      isStudentsLoading: false,
      students: action.students,
    })
  ),
  on(
    getStudentsFailureAction,
    (state): ExamStateInterface => ({
      ...state,
      isStudentsLoading: false,
    })
  )
);

export function reducers(state: ExamStateInterface, action: Action) {
  return examReducer(state, action);
}
