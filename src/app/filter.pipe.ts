// import { Injectable, Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//  name: 'searchfilter'
// })

// @Injectable()
// export class SearchFilterPipe implements PipeTransform {
//  transform(items: any[], field: string, value: string): any[] {
//    if (!items) return [];
//    return items.filter(it => it[field] == value);
//  }
// }
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it[field].toLowerCase().includes(searchText);
    });
   }
}
