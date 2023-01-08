import { NgFor } from '@angular/common';
import {
  ChangeDetectorRef,
  Directive,
  Input,
  NgIterable,
  OnChanges,
} from '@angular/core';

export interface FilterByFunction<Item, Filter> {
  (index: number, item: Item, activeFilter: Filter): boolean;
}

@Directive({
  selector: '[filterFor]',
  hostDirectives: [
    {
      directive: NgFor,
      inputs: ['ngForTrackBy:filterForTrackBy'],
    },
  ],
})
export class FilterForOfDirective<Item, Filter> implements OnChanges {
  @Input() filterForOf: NgIterable<Item>;
  @Input() filterForActiveFilter: Filter;
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
