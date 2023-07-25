import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import {
  updateTeacherWorkingDaysAction,
  updateTeacherWorkingDaysFailureAction,
  updateTeacherWorkingDaysSuccessAction,
} from '../actions/updateTeacherWorkingDays.action';
import { TeacherApiService } from 'src/app/core/api/teacher-api.service';
import { Router } from '@angular/router';

@Injectable()
export class UpdateTeacherWorkingDaysEffect {
  updateTeacherWorkingDays$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTeacherWorkingDaysAction),
      switchMap(({ request }) => {
        return this.teacherApiService.updateTeacherWorkingDays(request).pipe(
          map(() => updateTeacherWorkingDaysSuccessAction()),
          catchError(() => {
            return of(updateTeacherWorkingDaysFailureAction());
          })
        );
      })
    );
  });

  redirectAfterSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(updateTeacherWorkingDaysSuccessAction),
        tap(() => {
          this.router.navigate(['teacher']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private teacherApiService: TeacherApiService,
    private router: Router
  ) {}
}
