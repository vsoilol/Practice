import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, of, map, catchError } from 'rxjs';
import { TeacherApiService } from 'src/app/core/api/teacher-api.service';
import {
  getAllTeachersAction,
  getAllTeachersFailureAction,
  getAllTeachersSuccessAction,
} from '../actions/getAllTeachers.action';
import { Teacher } from 'src/app/core/models/responses/teacher';

@Injectable()
export class GetAllTeachersEffect {
  getAllTeachers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllTeachersAction),
      switchMap(() => {
        return this.teacherService.getAll().pipe(
          map((teachers: Teacher[]) => getAllTeachersSuccessAction({ teachers })),
          catchError(() => {
            return of(getAllTeachersFailureAction());
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private teacherService: TeacherApiService
  ) {}
}
