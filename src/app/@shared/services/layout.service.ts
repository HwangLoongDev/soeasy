import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  collapsedState$ = new BehaviorSubject<boolean>(false);
  collapsedValue = this.collapsedState$.value;
}
