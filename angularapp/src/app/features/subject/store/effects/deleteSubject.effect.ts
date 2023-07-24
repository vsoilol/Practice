import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { SubjectApiService } from 'src/app/core/api/subject-api.service';
import {
  deleteSubjectAction,
  deleteSubjectFailureAction,
  deleteSubjectSuccessAction,
} from '../actions/deleteSubject.action';
import { getAllSubjectsAction } from '../actions/getAllSubjects.action';

@Injectable()
export class DeleteSubjectEffect {
  deleteSubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteSubjectAction),
      switchMap(({ id }) => {
        return this.subjectService.delete(id).pipe(
          map(deleteSubjectSuccessAction),
          catchError(() => {
            return of(deleteSubjectFailureAction());
          })
        );
      })
    );
  });

  deleteSubjectSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteSubjectSuccessAction),
      map(getAllSubjectsAction)
    );
  });

  constructor(
    private actions$: Actions,
    private subjectService: SubjectApiService
  ) {}
}
