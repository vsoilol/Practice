import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WorkingDayApiService } from 'src/app/core/api/working-day-api.service';
import {
  getWorkingDaysByTeacherIdAction,
  getWorkingDaysByTeacherIdFailureAction,
  getWorkingDaysByTeacherIdSuccessAction,
} from '../actions/getWorkingDaysByTeacherId.action';
import { switchMap, map, catchError, of } from 'rxjs';
import { WorkingDay } from 'src/app/core/models/responses/workingDay';

@Injectable()
export class GetWorkingDaysByTeacherIdEffect {
  getWorkingDaysByTeacherId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getWorkingDaysByTeacherIdAction),
      switchMap(({ teacherId }) => {
        return this.workingDayApiService.getAllDaysByTeacherId(teacherId).pipe(
          map((workingDays: WorkingDay[]) =>
            getWorkingDaysByTeacherIdSuccessAction({ workingDays })
          ),
          catchError(() => {
            return of(getWorkingDaysByTeacherIdFailureAction());
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private workingDayApiService: WorkingDayApiService
  ) {}
}
