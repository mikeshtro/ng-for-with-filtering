import { Component } from '@angular/core';

/**
 * Simple example component using number values and filter from select element
 */
@Component({
  selector: 'my-simple-filter',
  template: `
    <h1>Simple filter</h1>

    <select #mySelect="ngModel" ngModel="all">
      <option value="all">Show all</option>
      <option value="even">Show even</option>
      <option value="odd">Show odd</option>
    </select>

    <div>
      <span
        *filterFor="
          let value of simpleValues;
          activeFilter: mySelect.value;
          filterBy: filterBySimpleValues
        "
      >
        {{ value }}
      </span>
    </div>
  `,
  styles: [],
})
export class SimpleFilterComponent {
  protected simpleValues = [1, 2, 3, 4, 5, 6];

  protected filterBySimpleValues(
    index: number,
    item: number,
    active: 'all' | 'even' | 'odd'
  ): boolean {
    const isEven = item % 2 === 0;
    switch (active) {
      case 'even':
        return isEven;
      case 'odd':
        return !isEven;
      default:
        return true;
    }
  }
}
