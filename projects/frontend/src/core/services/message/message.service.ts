import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  // Observable string sources
  private messageSource = new Subject<string>();
  private confirmationSource = new Subject<string>();

  // Observable string streams
  public messageSource$ = this.messageSource.asObservable();
  public confirmationSource$ = this.confirmationSource.asObservable();

  // Service message commands
  send(message: string) {
    this.messageSource.next(message);
  }

  confirm(confirmation: string) {
    this.confirmationSource.next(confirmation);
  }
}
