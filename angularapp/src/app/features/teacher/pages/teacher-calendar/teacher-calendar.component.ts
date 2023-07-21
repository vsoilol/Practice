import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  DestroyRef,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, filter, map, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { getWorkingDaysByTeacherIdAction } from '../../store/actions/getWorkingDaysByTeacherId.action';
import {
  selectIsLoading,
  selectIsUpdateWorkingDaysLoading,
  selectWorkingDaysWithoutId,
} from '../../store/selectors';
import { DateHelperService } from 'src/app/shared/services/date-helper.service';
import { updateTeacherWorkingDaysAction } from '../../store/actions/updateTeacherWorkingDays.action';
import { UpdateTeacherWorkingDaysRequest } from 'src/app/core/models/requests/teacher/updateTeacherWorkingDaysRequest';

@Component({
  selector: 'app-teacher-calendar',
  templateUrl: './teacher-calendar.component.html',
  styleUrls: ['./teacher-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCalendarComponent implements OnInit {
  workingDays$: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>([]);
  isLoading$!: Observable<boolean>;
  isUpdateWorkingDaysLoading$!: Observable<boolean>;
  teacherId!: string;

  route$ = this.route.params.pipe(
    map(params => params['teacherId']),
    tap(teacherId => {
      this.teacherId = teacherId;
      this.store.dispatch(getWorkingDaysByTeacherIdAction({ teacherId }));
    }),
    takeUntilDestroyed()
  );

  destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private dateHelper: DateHelperService
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectWorkingDaysWithoutId)
      .pipe(
        filter(dates => dates.length !== 0),
        take(1)
      )
      .subscribe(dates => this.workingDays$.next(dates));

    this.route$.subscribe();
    this.isLoading$ = this.store.select(selectIsLoading);
    this.isUpdateWorkingDaysLoading$ = this.store.select(
      selectIsUpdateWorkingDaysLoading
    );
  }

  handleDateCellClick(date: Date): void {
    const selectedDates = this.workingDays$.value;
    const isDateSelected = this.dateHelper.isDateInArray(selectedDates, date);
    let workingDaysDate: Date[];

    if (isDateSelected) {
      workingDaysDate = selectedDates.filter(
        d => !this.dateHelper.areDatesEqual(d, date)
      );
    } else {
      workingDaysDate = [...selectedDates, date];
    }

    this.workingDays$.next(workingDaysDate);
  }

  handleCancelClick() {
    this.router.navigate(['teacher']);
  }

  handleSaveClick() {
    const request: UpdateTeacherWorkingDaysRequest = {
      teacherId: this.teacherId,
      dates: this.workingDays$.value.map(value =>
        this.dateHelper.toISOString(value)
      ),
    };

    this.store.dispatch(updateTeacherWorkingDaysAction({ request }));
  }
}
