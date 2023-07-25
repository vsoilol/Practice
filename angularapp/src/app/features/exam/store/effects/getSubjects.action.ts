import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { SubjectApiService } from 'src/app/core/api/subject-api.service';
import {
  getSubjectsAction,
  getSubjectsFailureAction,
  getSubjectsSuccessAction,
} from '../actions/getSubjects.action';
import { Subject } from 'src/app/core/models/responses/subject';

@Injectable()
export class GetSubjectsEffect {
  getSubjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getSubjectsAction),
      switchMap(() => {
        return this.subjectApiService.getAll().pipe(
          map((subjects: Subject[]) => getSubjectsSuccessAction({ subjects })),
          catchError(() => {
            return of(getSubjectsFailureAction());
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private subjectApiService: SubjectApiService
  ) {}
}
