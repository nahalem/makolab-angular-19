import { ISPNotification } from "../../models/notification";
import { NotificationType } from "../../models/notification-type.enum";

export class NotificationHelper {
  public notification(notificationType: NotificationType, title: string = '', message: string = '', notifyUser?: boolean): ISPNotification {
    let notify = new ISPNotification();
    notify.message = message;
    notify.type = notificationType;
    notify.notifyUser = notifyUser;
    notify.title = title;
    return notify;
  }
}
