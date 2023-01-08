import { Component } from '@angular/core';
import { MessagesService } from './messages.service';

@Component({
  selector: 'my-multi-value-filter',
  template: `
    <h1>Multi value filter</h1>

    <input
      id="info"
      type="checkbox"
      [ngModel]="allFilters[0].isActive"
      (ngModelChange)="setFilters('info', $event)"
    />
    <label for="info">Info</label>
    
    <input
      id="warning"
      type="checkbox"
      [ngModel]="allFilters[1].isActive"
      (ngModelChange)="setFilters('warning', $event)"
    />
    <label for="warning">Warning</label>
    
    <input
      id="danger"
      type="checkbox"
      [ngModel]="allFilters[2].isActive"
      (ngModelChange)="setFilters('danger', $event)"
    />
    <label for="danger">Danger</label>

    <div>
      <div
        *filterFor="
          let value of messages$ | async;
          activeFilter: allFilters;
          filterBy: filterByType;
          trackBy: trackById
        "
      >
        {{ value.text }}
      </div>
    </div>
  `,
  styles: [],
})
export class MultiValueFilterComponent {
  protected readonly messages$ = this.messagesService.getAll();

  protected allFilters = [
    { value: 'info', isActive: true },
    { value: 'warning', isActive: true },
    { value: 'danger', isActive: true },
  ];

  constructor(private readonly messagesService: MessagesService) {}

  protected trackById(
    index: number,
    item: { id: number; type: string; text: string }
  ): number {
    return item.id;
  }

  protected filterByType(
    index: number,
    item: { id: number; type: string; text: string },
    active: { value: string; isActive: boolean }[]
  ): boolean {
    return active.find((filter) => filter.value === item.type).isActive;
  }

  protected setFilters(type: string, value: boolean): void {
    const newFilters = [...this.allFilters];
    const updatedFilter = newFilters.find((filter) => filter.value === type);
    updatedFilter.isActive = value;
    this.allFilters = newFilters;
  }
}
