import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { SubjectApiService } from 'src/app/core/api/subject-api.service';
import {
  updateSubjectAction,
  updateSubjectFailureAction,
  updateSubjectSuccessAction,
} from '../actions/updateSubject.action';
import { getAllSubjectsAction } from '../actions/getAllSubjects.action';

@Injectable()
export class UpdateSubjectEffect {
  updateSubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateSubjectAction),
      switchMap(({ request }) => {
        return this.subjectService.update(request).pipe(
          map(updateSubjectSuccessAction),
          catchError(() => {
            return of(updateSubjectFailureAction());
          })
        );
      })
    );
  });

  updateSubjectSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateSubjectSuccessAction),
      map(getAllSubjectsAction)
    );
  });

  constructor(
    private actions$: Actions,
    private subjectService: SubjectApiService
  ) {}
}
