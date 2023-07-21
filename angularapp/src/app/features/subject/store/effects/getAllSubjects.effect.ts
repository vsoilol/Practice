import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, of, map, catchError } from 'rxjs';
import { SubjectApiService } from 'src/app/core/api/subject-api.service';

import { Subject } from 'src/app/core/models/responses/subject';
import {
  getAllSubjectsAction,
  getAllSubjectsFailureAction,
  getAllSubjectsSuccessAction,
} from '../actions/getAlLSubjects.action';

@Injectable()
export class GetAllSubjectsEffect {
  getAllSubjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllSubjectsAction),
      switchMap(() => {
        return this.subjectService.getAll().pipe(
          map((subjects: Subject[]) =>
            getAllSubjectsSuccessAction({ subjects })
          ),
          catchError(() => {
            return of(getAllSubjectsFailureAction());
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private subjectService: SubjectApiService
  ) {}
}
