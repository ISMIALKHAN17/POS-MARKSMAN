import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], filterValue: string): any[] {
    if (!items || !filterValue) {
      return items;
    }
    return items.filter(item => {
      return Object.keys(item).some(key => {
        return item[key].toString().toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  }
}
