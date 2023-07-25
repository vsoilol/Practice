import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { ExamApiService } from 'src/app/core/api/exam-api.service';
import {
  deleteExamAction,
  deleteExamFailureAction,
  deleteExamSuccessAction,
} from '../actions/deleteExam.action';
import { getAllExamsAction } from '../actions/getAllExams.action';

@Injectable()
export class DeleteExamEffect {
  deleteExam$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteExamAction),
      switchMap(({ id }) => {
        return this.examService.delete(id).pipe(
          map(deleteExamSuccessAction),
          catchError(() => {
            return of(deleteExamFailureAction());
          })
        );
      })
    );
  });

  deleteExamSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteExamSuccessAction),
      map(getAllExamsAction)
    );
  });

  constructor(
    private actions$: Actions,
    private examService: ExamApiService
  ) {}
}
