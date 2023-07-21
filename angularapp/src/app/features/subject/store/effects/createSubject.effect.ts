import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { SubjectApiService } from 'src/app/core/api/subject-api.service';
import {
  createSubjectAction,
  createSubjectFailureAction,
  createSubjectSuccessAction,
} from '../actions/createSubject.action';
import { getAllSubjectsAction } from '../actions/getAlLSubjects.action';

@Injectable()
export class CreateSubjectEffect {
  createSubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createSubjectAction),
      switchMap(({ request }) => {
        return this.subjectService.create(request).pipe(
          map(createSubjectSuccessAction),
          catchError(() => {
            return of(createSubjectFailureAction());
          })
        );
      })
    );
  });

  createSubjectSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createSubjectSuccessAction),
      map(getAllSubjectsAction)
    );
  });

  constructor(
    private actions$: Actions,
    private subjectService: SubjectApiService
  ) {}
}
