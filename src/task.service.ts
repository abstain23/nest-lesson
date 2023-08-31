import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { AaaService } from './aaa/aaa.service';

@Injectable()
export class TaskService {
  @Inject(AaaService)
  private aaaService: AaaService;

  @Cron(CronExpression.EVERY_5_SECONDS, {
    name: 'task1',
    timeZone: 'Asia/shanghai',
  })
  handleCore() {
    console.log('task execute', this.aaaService.findAll());
  }

  @Interval('task2', 500)
  task2() {
    console.log('task2');
  }
}
