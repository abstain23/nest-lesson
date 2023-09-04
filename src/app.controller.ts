import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import {exec} from 'child_process'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    debugger;
    return this.appService.getHello();
  }

  @Sse('stream')
  stream() {

    const childProcess = exec('tail -f ./log');

    return new Observable((observer) => {
      childProcess.stdout.on('data', (msg) => {
        observer.next({ data: { msg: msg.toString() }});
      })
    });
  }
}
