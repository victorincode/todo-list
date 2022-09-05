import { Pipe, PipeTransform } from '@angular/core';
import { ItemData } from '../interfaces/item-data.interface';

@Pipe({
  name: 'filterByName',
})
export class FilterByNamePipe implements PipeTransform {
  transform(array: ItemData[], name: string): any {
    const regex = new RegExp(name, 'gi');
    const filteredArray = array.filter((item) => {
      const matchesName = regex.exec(item.title);
      if (matchesName) return item;
      return;
    });
    return filteredArray;
  }
}
