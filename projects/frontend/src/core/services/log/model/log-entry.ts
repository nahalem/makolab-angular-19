import { LogLevel } from './log-level.enum';


export class LogEntry {

    logDate = true;
    message = '';
    timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'} as const;
    dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric'} as const;
    level: LogLevel = LogLevel.DEBUG;
    appendix: any[] = [];

    build(): string {

        let logMsg = '';

        if (this.logDate) {
          const dateTime = new Date();
          logMsg = dateTime.toLocaleString('en-US', this.timeOptions) + ' - ' + dateTime.toLocaleString('en-US', this.dateOptions) + ' - ' ;
        }

        logMsg += '[' + LogLevel[this.level] + ']:';
        logMsg = logMsg.padEnd(34, ' ');
        logMsg += this.message;

        if (this.appendix.length) {
          logMsg += ' - ' + this.format(this.appendix);
        }

        return logMsg;
    }

    private format(parameter: any[]): string {

        let str = '';

        if (parameter.some(p => typeof p === 'object')) {

          parameter.forEach(element => {
            str += JSON.stringify(element) + ',';
          });

        } else {
            str = parameter.join(',');
        }

        return str;
    }


}
