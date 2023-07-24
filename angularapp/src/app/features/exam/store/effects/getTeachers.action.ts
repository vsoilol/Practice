import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { TeacherApiService } from 'src/app/core/api/teacher-api.service';
import {
  getTeachersAction,
  getTeachersFailureAction,
  getTeachersSuccessAction,
} from '../actions/getTeachers.action';
import { Teacher } from 'src/app/core/models/responses/teacher';
import { DateHelperService } from 'src/app/shared/services/date-helper.service';

@Injectable()
export class GetTeachersEffect {
  getTeachers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTeachersAction),
      switchMap(({ date }) => {
        const correctDate = this.dateHelper.toISOString(date);
        return this.teacherApiService.getAllByDate(correctDate).pipe(
          map((teachers: Teacher[]) => getTeachersSuccessAction({ teachers })),
          catchError(() => {
            return of(getTeachersFailureAction());
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private teacherApiService: TeacherApiService,
    private dateHelper: DateHelperService
  ) {}
}
