import { NotificationType } from './notification-type.enum';

export class ISPNotification {
    type!: NotificationType;
    title: string = '';
    message: string  = '';
    configuration?: any = {};
    notifyUser?: boolean;
}
