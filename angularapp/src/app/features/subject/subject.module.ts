import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectsTableComponent } from './pages/subjects-table/subjects-table.component';
import { EditSubjectModalComponent } from './modals/edit-subject-modal/edit-subject-modal.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateSubjectEffect } from './store/effects/createSubject.effect';
import { DeleteSubjectEffect } from './store/effects/deleteSubject.effect';
import { GetAllSubjectsEffect } from './store/effects/getAllSubjects.effect';
import { UpdateSubjectEffect } from './store/effects/updateSubject.effect';
import { reducers } from './store/reducers';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [SubjectsTableComponent, EditSubjectModalComponent],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    StoreModule.forFeature('subject', reducers),
    EffectsModule.forFeature([
      GetAllSubjectsEffect,
      CreateSubjectEffect,
      UpdateSubjectEffect,
      DeleteSubjectEffect,
    ]),
    SharedModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
  ],
})
export class SubjectModule {}
