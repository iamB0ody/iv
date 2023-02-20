import { Injectable } from '@angular/core';
import { Toast } from '../models/toast';
import { ToastType } from '../models/toast-type';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  subject!: BehaviorSubject<Toast>;
  toast$: Observable<Toast>;
  t!:Toast;

  constructor() {
     this.subject = new BehaviorSubject<Toast>(this.t);
    this.toast$ = this.subject.asObservable()
      .pipe(filter(toast => toast !== this.t));
  }

  show(type: ToastType, title?: string, body?: string, delay?: number) {
    this.subject.next({ type, title, body, delay });
  }
}