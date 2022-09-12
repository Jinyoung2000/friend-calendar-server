import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Schedules from './schedules.entity';
import { SchedulesService } from './schedules.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedules])],
  providers: [SchedulesService],
  exports: [SchedulesService],
  controllers: [],
})
export class SchedulesModule {}
