import { Injectable } from '@angular/core';
import { LogPublisher } from './model/log-publisher';
import { ConsolePublisher } from './model/console-publisher';
import { LogLevel } from './model/log-level.enum';
import { environment } from '@env/environment';
import { LoggerConfig } from './model/logger-config';


@Injectable({
  providedIn: 'root'
})
export class LogPublisherService {

  private defaultLevel: LogLevel = LogLevel.INFO;
  private loggerConfig: LoggerConfig[];

  publishers: LogPublisher[] = [];
  private publisherImpl: any = {
            'Console': ConsolePublisher
          };
  
  constructor() {
     
    this.loggerConfig = environment.logger;

    this.build();

  }

  private build(): void {

    this.loggerConfig.forEach((log: LoggerConfig) => {

      const name = log.name;
      const target = log.target;
      const level = (log.level) ? LogLevel[log.level as keyof typeof LogLevel] : this.defaultLevel;

      // tslint:disable-next-line:prefer-const
      let pub = new this.publisherImpl[name](target, level);
      this.publishers.push(pub);

    });


  }


}
