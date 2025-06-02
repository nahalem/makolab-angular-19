import { Injectable, InjectionToken } from '@angular/core';
import { LogEntry } from './model/log-entry';
import { LogLevel } from './model/log-level.enum';
import { LogPublisher } from './model/log-publisher';
import { LogPublisherService } from './log-publisher.service';
export const LOG_SERVICE = new InjectionToken('log_service');

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private publishers: LogPublisher[];
  private logDate = true;

  constructor(private logPublisherService: LogPublisherService) {
    this.publishers = logPublisherService.publishers;
  }

  debug(msg: string, ...append: any[]) {
    this.write(msg,
               LogLevel.DEBUG,
               append);
  }

  info(msg: string, ...append: any[]) {
    this.write(msg,
               LogLevel.INFO,
               append);
  }

  warn(msg: string, ...append: any[]) {
    this.write(msg,
               LogLevel.WARNING,
               append);
  }

  error(msg: string, ...append: any[]) {
    this.write(msg,
               LogLevel.ERROR,
               append);
  }

  fatal(msg: string, ...append: any[]) {
    this.write(msg,
               LogLevel.FATAL,
               append);
  }

  log(msg: string, ...append: any[]) {
    this.write(msg,
               LogLevel.ALL,
               append);
  }

  private write(msg: string,
                level: LogLevel,
                append: any[]) {

      const entry: LogEntry = new LogEntry();
      entry.message = msg;
      entry.level = level;
      entry.appendix = append;
      entry.logDate = this.logDate;
      this.publishers.forEach(
        publisher => {
          publisher.log(entry);
        }
      );

  }

}
