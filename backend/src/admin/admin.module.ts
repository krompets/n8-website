import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../models/project.model';
import { AllowedEmail } from '../models/allowed-email.model';
import { AllowedEmailsController } from './controllers/allowed-emails.controller';
import { AllowedEmailsService } from './services/allowed-emails.service';
import { AuthModule } from '../auth/auth.module';
import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, AllowedEmail]), AuthModule],
  controllers: [ProjectController, AllowedEmailsController],
  providers: [ProjectService, AllowedEmailsService],
})
export class AdminModule {} 