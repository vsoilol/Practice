import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { ExamApiService } from 'src/app/core/api/exam-api.service';
import {
  createExamAction,
  createExamFailureAction,
  createExamSuccessAction,
} from '../actions/createExam.action';
import { getAllExamsAction } from '../actions/getAllExams.action';

@Injectable()
export class CreateExamEffect {
  createExam$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createExamAction),
      switchMap(({ request }) => {
        return this.examService.create(request).pipe(
          map(createExamSuccessAction),
          catchError(() => {
            return of(createExamFailureAction());
          })
        );
      })
    );
  });

  createExamSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createExamSuccessAction),
      map(getAllExamsAction)
    );
  });

  constructor(private actions$: Actions, private examService: ExamApiService) {}
}
