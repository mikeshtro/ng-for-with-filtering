import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  getAll() {
    return of([
      { id: 1, type: 'info', text: 'The system has started' },
      { id: 2, type: 'info', text: 'The system runs for an hour' },
      { id: 3, type: 'warning', text: 'Temperature is getting higher' },
      { id: 4, type: 'warning', text: 'Temperature still grows' },
      { id: 5, type: 'danger', text: 'Red button was pressed' },
      { id: 6, type: 'info', text: 'The system has started' },
      {
        id: 7,
        type: 'danger',
        text: 'Force restart did not work and the system is overheeting',
      },
      { id: 8, type: 'info', text: 'The mechanic came' },
      {
        id: 9,
        type: 'warning',
        text: 'Looks like the mechanic was not able to fix it',
      },
      { id: 10, type: 'danger', text: '💣💥💥BOOOM💥' },
    ]);
  }
}
