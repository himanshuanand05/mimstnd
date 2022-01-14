import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'minToHours'
})

export class MinToHoursPipe implements PipeTransform {

  transform(value: number): string {
    let hrs: string | number = Math.floor(value / 60);
    let min:  number = value % 60;
    return `${hrs} hrs ${min} min`;
  }

}