import { NgFor } from '@angular/common';
import {
  ChangeDetectorRef,
  Directive,
  Input,
  NgIterable,
  OnChanges,
} from '@angular/core';

/**
 * Interface to define filterBy function
 * @param index index of the item
 * @param item the actual item value
 * @param activeFilter the actual filter value
 * @return true if the value should stay in the list
 */
export interface FilterByFunction<Item, Filter> {
  (index: number, item: Item, activeFilter: Filter): boolean;
}

/**
 * `filterFor` directive extends Angular `ngFor` directive by filtering options
 * It uses original Angular `ngFor` using Angular composition API and filters the values before passing them
 * to the original directive
 */
@Directive({
  selector: '[filterFor]',
  hostDirectives: [
    {
      directive: NgFor,
      // expose trackBy function so it can be used same way as in original `ngFor`
      inputs: ['ngForTrackBy:filterForTrackBy'],
    },
  ],
})
export class FilterForOfDirective<Item, Filter> implements OnChanges {
  /**
   * Items to be iterated. It is the same data type as in `ngFor`
   */
  @Input() filterForOf: NgIterable<Item>;
  /**
   * Active filter value. This value will be used later in filterBy function
   */
  @Input() filterForActiveFilter: Filter;
  /**
   * Function to filter items before passing to original `ngFor`
   */
  @Input() filterForFilterBy: FilterByFunction<Item, Filter>;

  constructor(
    private readonly ngFor: NgFor<Item, NgIterable<Item>>,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnChanges(): void {
    this.ngFor.ngForOf = this.applyFilter(
      this.filterForOf,
      this.filterForActiveFilter,
      this.filterForFilterBy
    );
    this.changeDetectorRef.detectChanges();
  }

  private applyFilter(
    values: NgIterable<Item>,
    filterValues: Filter,
    filterBy: FilterByFunction<Item, Filter>
  ): NgIterable<Item> {
    if (values == null || filterBy == null) {
      return values;
    }

    const filteredValues: Item[] = [];

    let index = 0;
    for (const value of values) {
      if (filterBy(index, value, filterValues)) {
        filteredValues.push(value);
      }
      index += 1;
    }

    return filteredValues;
  }
}
