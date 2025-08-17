import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../models/project.model';

@Controller('projects')
export class PublicProjectsListController {
  constructor(@InjectRepository(Project) private projectRepo: Repository<Project>) {}

  @Get()
  async list() {
    const list = await this.projectRepo.find();
    return list.map((p) => ({
      // Map DB -> IProject shape. Expect name to be set.
      name: p.name || String(p.id),
      title: p.title,
      icon: `/api/projects/${p.name || p.id}/icon`,
      rating: p.rating || 'Not rated',
      description: p.description,
      status: p.status || 'active',
      dates: p.dates || '',
      type: p.type || '',
      requirements: ((): any => {
        const value: any = (p as any).requirements;
        if (!value) return undefined;
        if (typeof value === 'string') {
          try { return JSON.parse(value); } catch { return undefined; }
        }
        return value;
      })(),
      media: ((): any => {
        const value: any = (p as any).media;
        if (!value) return {};
        if (typeof value === 'string') {
          try { return JSON.parse(value); } catch { return {}; }
        }
        return value;
      })(),
    }));
  }
}


