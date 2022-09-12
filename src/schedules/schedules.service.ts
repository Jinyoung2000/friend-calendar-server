import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './interfaces/schedule.interface';
import Schedules from './schedules.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedules)
    private schedulesRepository: Repository<Schedules>,
  ) {}

  async create(schedule: Schedule) {
    return this.schedulesRepository.save(schedule);
  }
}
