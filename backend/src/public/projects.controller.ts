import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../models/project.model';

@Controller('projects')
export class PublicProjectsController {
  constructor(@InjectRepository(Project) private projectRepo: Repository<Project>) {}

  @Get(':key/icon')
  async getIcon(@Param('key') key: string, @Res() res: Response) {
    let project: Project | null = null;
    if (/^\d+$/.test(key)) {
      project = await this.projectRepo.findOne({ where: { id: Number(key) } as any });
    } else {
      project = await this.projectRepo.findOne({ where: { name: key } as any });
    }
    if (!project || !project.image) {
      throw new NotFoundException('Icon not found');
    }
    res.setHeader('Content-Type', project.imageType || 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(project.image);
  }
}


