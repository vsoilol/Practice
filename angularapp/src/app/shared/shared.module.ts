import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DateExistsInArrayPipe } from './pipes/date-in-array.pipe';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [RouterModule, ReactiveFormsModule, DateExistsInArrayPipe],
  declarations: [DateExistsInArrayPipe],
})
export class SharedModule {}
