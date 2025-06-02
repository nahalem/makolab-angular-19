import { LogEntry } from './log-entry';
import { Observable } from 'rxjs';
import { LogLevel } from './log-level.enum';

export abstract class LogPublisher {

    level: LogLevel;
    target: string;

    constructor(tgt: string, lvl: LogLevel) {
        this.target = tgt;
        this.level = lvl;
//        console.log('Logger created: target [' + this.target + ']; Level: [' + this.level + ']');
    }

    protected isEnabled(msgLevel: LogLevel): boolean {
        return msgLevel >= this.level;
    }

    abstract log(record: LogEntry): Observable<boolean>;
    abstract clear(): Observable<boolean>;
}
