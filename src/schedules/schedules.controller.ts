import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateScheduleDto } from './dtos/create-schedule.dto';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createSchedule(@Request() req, @Body() body: CreateScheduleDto) {
    return this.schedulesService.create({
      user_id: req.user.id,
      title: body.title,
      description: body.description,
    });
  }
}
