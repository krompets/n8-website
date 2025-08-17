import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../../models/project.model';

function safeParse(value: string): any {
  try { return JSON.parse(value); } catch { return undefined; }
}

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<any[]> {
    const projects = await this.projectRepository.find();
    return projects.map((p) => {
      const req: any = (p as any).requirements;
      const med: any = (p as any).media;
      const parsedRequirements = typeof req === 'string' ? safeParse(req) : req;
      const parsedMedia = typeof med === 'string' ? safeParse(med) : med;
      return {
        ...p,
        requirements: parsedRequirements,
        media: parsedMedia,
        image: p.image ? (p.image as Buffer).toString('base64') : undefined,
      };
    });
  }

  async findOne(id: number): Promise<any> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    const req: any = (project as any).requirements;
    const med: any = (project as any).media;
    return {
      ...project,
      requirements: typeof req === 'string' ? safeParse(req) : req,
      media: typeof med === 'string' ? safeParse(med) : med,
      image: project.image ? (project.image as Buffer).toString('base64') : undefined,
    };
  }

  async create(projectData: Partial<Project>, image: Express.Multer.File): Promise<Project> {
    // Normalize technologies: accept comma-separated string or array
    let technologies: string[] | undefined = undefined;
    if (projectData.technologies) {
      if (Array.isArray(projectData.technologies)) {
        technologies = projectData.technologies as unknown as string[];
      } else if (typeof projectData.technologies === 'string') {
        technologies = (projectData.technologies as unknown as string)
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
      }
    }

    // Parse structured fields if provided as JSON strings
    let details: any = projectData.details;
    if (typeof details === 'string') {
      try { details = JSON.parse(details as unknown as string); } catch { details = undefined; }
    }
    let requirements: any = (projectData as any).requirements;
    if (typeof requirements === 'string') {
      try { requirements = JSON.parse(requirements as unknown as string); } catch { requirements = undefined; }
    }
    let media: any = (projectData as any).media;
    if (typeof media === 'string') {
      try { media = JSON.parse(media as unknown as string); } catch { media = undefined; }
    }

    // Generate slug name if missing
    const toSlug = (s: string) =>
      s
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    let name = (projectData as any).name as string | undefined;
    if (!name && projectData.title) {
      name = toSlug(projectData.title);
    }

    if (name) {
      let candidate = name;
      let suffix = 1;
      // Ensure uniqueness
      while (await this.projectRepository.findOne({ where: { name: candidate } as any })) {
        candidate = `${name}-${suffix++}`;
      }
      name = candidate;
    }

    const project = this.projectRepository.create({
      ...projectData,
      ...(technologies ? { technologies } : {}),
      ...(details ? { details } : {}),
      ...(requirements ? { requirements } : {}),
      ...(media ? { media } : {}),
      ...(name ? { name } : {}),
      image: image?.buffer,
      imageType: image?.mimetype,
    });
    return this.projectRepository.save(project);
  }

  async update(id: number, projectData: Partial<Project>, image?: Express.Multer.File): Promise<Project> {
    // Load raw entity from repository to preserve Buffer fields
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    
    // Normalize technologies
    let technologies: string[] | undefined = undefined;
    if (projectData.technologies) {
      if (Array.isArray(projectData.technologies)) {
        technologies = projectData.technologies as unknown as string[];
      } else if (typeof projectData.technologies === 'string') {
        technologies = (projectData.technologies as unknown as string)
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
      }
    }

    // Parse details if string
    const updateData: Partial<Project> = { ...projectData } as Partial<Project>;
    if (typeof updateData.details === 'string') {
      try { (updateData as any).details = JSON.parse(updateData.details as unknown as string); } catch {}
    }
    // Prevent accidental image overwrite when no file provided
    if (!image) {
      delete (updateData as any).image;
      delete (updateData as any).imageType;
    }
    if (technologies) {
      (updateData as any).technologies = technologies;
    }

    // Optionally update name (slug, unique)
    if ((updateData as any).name) {
      const toSlug = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      let name = toSlug((updateData as any).name as string);
      if (!name && updateData.title) name = toSlug(updateData.title);
      if (name) {
        let candidate = name;
        let suffix = 1;
        while (await this.projectRepository.findOne({ where: { name: candidate } as any })) {
          const exists = await this.projectRepository.findOne({ where: { name: candidate } as any });
          if (exists && exists.id === id) break;
          candidate = `${name}-${suffix++}`;
        }
        (updateData as any).name = candidate;
      }
    }
    if (image) {
      updateData.image = image.buffer;
      updateData.imageType = image.mimetype;
    }

    Object.assign(project, updateData);
    return this.projectRepository.save(project);
  }

  async delete(id: number): Promise<void> {
    const result = await this.projectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
} 