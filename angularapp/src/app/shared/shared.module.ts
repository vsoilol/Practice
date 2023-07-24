import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateExistsInArrayPipe } from './pipes/date-in-array.pipe';
import { TeacherFullNamePipe } from './pipes/teacher-full-name.pipe';
import { StudentFullNamePipe } from './pipes/student-full-name.pipe';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    DateExistsInArrayPipe,
    TeacherFullNamePipe,
    StudentFullNamePipe,
  ],
  declarations: [
    DateExistsInArrayPipe,
    TeacherFullNamePipe,
    StudentFullNamePipe,
  ],
})
export class SharedModule {}
