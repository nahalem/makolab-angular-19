import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISPNotification } from '../../models/notification';
import { NotificationType } from '../../models/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private queue: BehaviorSubject<ISPNotification> = new BehaviorSubject({} as ISPNotification);
  readonly notifications: Observable<ISPNotification> = this.queue.asObservable();

  constructor(private toastr: ToastrService) {}


  notify(notification: ISPNotification, timeout?: number) {
    timeout = !timeout ? 6000 : timeout;

    if (notification.notifyUser) {
      this.notifyUser(notification);
    }
    else {
      this.notifyUser(notification);
    }
    this.queue.next(notification);
    setTimeout(() => this.queue.next({} as ISPNotification), timeout);

  }

  private notifyUser(notification: ISPNotification) {
    switch (notification.type) {
      case NotificationType.SUCCESS:
      this.toastr.success(notification.message, notification.title, notification.configuration);
      break;
      case NotificationType.INFO:
      this.toastr.info(notification.message, notification.title, notification.configuration);
      break;
      case NotificationType.WARNING:
      this.toastr.warning(notification.message, notification.title, notification.configuration);
      break;
      case NotificationType.ERROR:
      this.toastr.error(notification.message, notification.title, notification.configuration);
      break;
    }

  }

}
