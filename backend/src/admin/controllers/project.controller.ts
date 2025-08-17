import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { ProjectService } from '../services/project.service';
import { Project } from '../../models/project.model';

@Controller('admin/projects')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async getAllProjects(): Promise<any[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  async getProject(@Param('id') id: number): Promise<any> {
    return this.projectService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async createProject(
    @Body() projectData: Partial<Project>,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Project> {
    return this.projectService.create(projectData, image);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async updateProject(
    @Param('id') id: number,
    @Body() projectData: Partial<Project>,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Project> {
    return this.projectService.update(id, projectData, image);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: number): Promise<void> {
    return this.projectService.delete(id);
  }
} 