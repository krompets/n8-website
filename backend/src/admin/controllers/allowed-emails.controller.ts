import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { AllowedEmailsService } from '../services/allowed-emails.service';

@Controller('admin/allowed-emails')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AllowedEmailsController {
  constructor(private service: AllowedEmailsService) {}

  @Get()
  list() {
    return this.service.findAll();
  }

  @Post()
  add(@Body('email') email: string) {
    return this.service.add(email);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}


