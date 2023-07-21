import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateHelperService {
  isDateInArray(array: Date[], value: Date): boolean {
    return array.some(item => this.areDatesEqual(item, value));
  }

  public areDatesEqual(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  public toISOString(date: Date){
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const dayString = day < 10 ? `0${day}` : day.toString();
    const monthString = month < 10 ? `0${month}` : month.toString();

    const resultString = `${year}-${monthString}-${dayString}T00:00:00.000Z`;

    return resultString;
  }
}
