import { LogPublisher } from './log-publisher';
import { LogEntry } from './log-entry';
import { Observable, of } from 'rxjs';
import { LogLevel } from './log-level.enum';

export class ConsolePublisher extends LogPublisher {

    log(entry: LogEntry): Observable<boolean> {

        let msgLogged = false;

        if (super.isEnabled(entry.level)) {

            switch (entry.level) {
                case LogLevel.ERROR:
                case LogLevel.FATAL:
                console.error(entry.build());
                break;
                default:
                console.log(entry.build());
                break;
            }
            msgLogged = true;

        }

        return of(msgLogged);
    }

    clear(): Observable<boolean> {
        console.clear();
        return of(true);
    }

}
