import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeachersTableComponent } from './pages/teachers-table/teachers-table.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CreateTeacherEffect } from './store/effects/createTeacher.effect';
import { DeleteTeacherEffect } from './store/effects/deleteTeacher.effect';
import { GetAllTeachersEffect } from './store/effects/getAllTeachers.effect';
import { UpdateTeacherEffect } from './store/effects/updateTeacher.effect';
import { reducers } from './store/reducers';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditTeacherModalComponent } from './modals/edit-teacher-modal/edit-teacher-modal.component';

@NgModule({
  declarations: [TeachersTableComponent, EditTeacherModalComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    StoreModule.forFeature('teacher', reducers),
    EffectsModule.forFeature([
      GetAllTeachersEffect,
      CreateTeacherEffect,
      UpdateTeacherEffect,
      DeleteTeacherEffect,
    ]),
    SharedModule,
  ],
})
export class TeacherModule {}
