import { Pipe, PipeTransform } from '@angular/core';
import { DateHelperService } from '../services/date-helper.service';

@Pipe({
  name: 'dateExistsInArray',
})
export class DateExistsInArrayPipe implements PipeTransform {
  constructor(private dateHelper: DateHelperService) {}

  transform(value: Date[], ...args: Date[]): boolean {
    const date = args[0];
    return this.dateHelper.isDateInArray(value, date);
  }
}
