import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns';

@Pipe({
  name: 'timeParser',
})
export class TimeParserPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]) {
    if (value != null) {
      return format(parseISO(value), 'HH:mm');
    }
  }
}
