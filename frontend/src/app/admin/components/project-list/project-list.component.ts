import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService, Project } from '../../services/project.service';
import { AuthService } from '../../../services/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-project-list',
  template: `
    <app-admin-menu></app-admin-menu>
    <div class="project-list">
      <div class="header">
        <h2>Projects</h2>
        <button (click)="onAdd()">Add New Project</button>
      </div>

      <div class="table">
        <div class="thead row">
          <div class="cell thumb">Image</div>
          <div class="cell title">Title</div>
          <div class="cell status">Status</div>
          <div class="cell tech">Technologies</div>
          <div class="cell actions">Actions</div>
        </div>
        <div class="tbody">
          <div class="row" *ngFor="let project of projects">
            <div class="cell thumb">
              <img [src]="imageSrc(project)" [alt]="project.title">
            </div>
            <div class="cell title">
              <div class="p-title">{{ project.title }}</div>
              <div class="p-desc">{{ project.description | slice:0:120 }}{{ project.description && project.description.length > 120 ? '…' : '' }}</div>
            </div>
            <div class="cell status">{{ project['status'] || 'active' }}</div>
            <div class="cell tech">
              <span class="tech-tag" *ngFor="let t of (project.technologies || [])">{{ t }}</span>
            </div>
            <div class="cell actions">
              <button (click)="onEdit(project.id)">Edit</button>
              <button (click)="onDelete(project.id)" class="delete">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .project-list { padding: 20px; color: #e9edf6; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }

    .table { width: 100%; border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; overflow: hidden; }
    .row { display: grid; grid-template-columns: 96px 1.2fr .4fr 1fr .6fr; gap: 12px; align-items: center; }
    .thead { background: rgba(255,255,255,0.06); font-weight: 600; letter-spacing: .3px; }
    .thead .cell { padding: 10px 14px; }
    .tbody .row { border-top: 1px solid rgba(255,255,255,0.08); padding: 10px 14px; }

    .cell.thumb img { width: 72px; height: 72px; object-fit: cover; border-radius: 8px; background: rgba(255,255,255,0.08); display: block; }
    .p-title { font-weight: 700; margin-bottom: 6px; }
    .p-desc { color: #b9c2d6; font-size: 13px; }

    .tech .tech-tag { background: rgba(255,255,255,0.08); color: #e9edf6; padding: 4px 8px; border-radius: 6px; margin-right: 6px; font-size: 12px; display: inline-block; }

    .actions { display: flex; gap: 10px; }
    button { padding: 8px 14px; border: none; border-radius: 8px; cursor: pointer; }
    button:not(.delete) { background: #007bff; color: #fff; }
    button.delete { background: #dc3545; color: #fff; }
  `]
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private auth: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/api/auth/google';
      return;
    }
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(
      projects => this.projects = projects,
      error => console.error('Error loading projects:', error)
    );
  }

  imageSrc(p: Project): SafeUrl | string {
    // Prefer backend icon endpoint to avoid base64 inconsistencies
    const key = (p as any).name ? (p as any).name : p.id;
    if (key !== undefined && key !== null) {
      return `/api/projects/${key}/icon`;
    }
    // Fallbacks
    const img = (p as any).image;
    const type = (p as any).imageType;
    if (img && type) {
      const url = `data:${type};base64,${img}`;
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }
    return 'assets/website.png';
  }

  onAdd() { this.router.navigate(['/admin/projects/new']); }
  onEdit(id: number) { this.router.navigate(['/admin/projects', id, 'edit']); }
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe(
        () => { this.projects = this.projects.filter(p => p.id !== id); },
        error => console.error('Error deleting project:', error)
      );
    }
  }
  logout() { this.auth.logout(); }
} 