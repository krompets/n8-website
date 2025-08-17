import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-form',
  template: `
    <div class="project-form">
      <h2>{{ isEditMode ? 'Edit Project' : 'Create Project' }}</h2>
      
      <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="title">Title <span class="req">*</span></label>
          <input id="title" type="text" formControlName="title" [class.invalid]="projectForm.get('title')?.touched && projectForm.get('title')?.invalid">
          <div class="error" *ngIf="projectForm.get('title')?.touched && projectForm.get('title')?.hasError('required')">Title is required</div>
        </div>

        <div class="form-group">
          <label for="name">URL key (optional)</label>
          <input id="name" type="text" formControlName="name" placeholder="e.g. aleo, base">
          <small>Якщо порожньо — згенерується зі назви.</small>
        </div>

        <div class="form-group">
          <label for="rating">Rating</label>
          <input id="rating" type="text" formControlName="rating" placeholder="Not rated">
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" formControlName="status">
            <option value="active">active</option>
            <option value="upcoming">upcoming</option>
            <option value="ended">ended</option>
          </select>
        </div>

        <div class="form-group">
          <label for="dates">Dates</label>
          <input id="dates" type="text" formControlName="dates" placeholder="N/a">
        </div>

        <div class="form-group">
          <label for="type">Type</label>
          <input id="type" type="text" formControlName="type" placeholder="Tech/Community">
        </div>

        <div class="form-group full">
          <label for="description">Description <span class="req">*</span></label>
          <textarea id="description" formControlName="description" [class.invalid]="projectForm.get('description')?.touched && projectForm.get('description')?.invalid"></textarea>
          <div class="error" *ngIf="projectForm.get('description')?.touched && projectForm.get('description')?.hasError('required')">Description is required</div>
        </div>

        <div class="form-group full">
          <label for="technologies">Technologies (comma-separated) <span class="req">*</span></label>
          <input id="technologies" type="text" formControlName="technologies" [class.invalid]="projectForm.get('technologies')?.touched && projectForm.get('technologies')?.invalid">
          <div class="error" *ngIf="projectForm.get('technologies')?.touched && projectForm.get('technologies')?.hasError('required')">Technologies are required</div>
        </div>

        <fieldset class="form-group">
          <legend>Requirements</legend>
          <input type="text" placeholder="CPU" formControlName="req_cpu">
          <input type="text" placeholder="RAM" formControlName="req_ram">
          <input type="text" placeholder="Storage" formControlName="req_storage">
          <input type="text" placeholder="OS" formControlName="req_os">
        </fieldset>

        <fieldset class="form-group">
          <legend>Media</legend>
          <input type="text" placeholder="Website" formControlName="m_website">
          <input type="text" placeholder="Twitter" formControlName="m_twitter">
          <input type="text" placeholder="Discord" formControlName="m_discord">
          <input type="text" placeholder="Telegram" formControlName="m_telegram">
          <input type="text" placeholder="GitHub" formControlName="m_github">
          <input type="text" placeholder="YouTube" formControlName="m_youtube">
          <input type="email" placeholder="Email" formControlName="m_email">
        </fieldset>

        <div class="form-group full">
          <label for="image">Project Image <span class="req">*</span></label>
          <input id="image" type="file" (change)="onFileChange($event)" [class.invalid]="imageRequiredError">
          <img *ngIf="imagePreview" [src]="imagePreview" class="image-preview">
          <div class="error" *ngIf="imageRequiredError">Project image is required</div>
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="projectForm.invalid">
            {{ isEditMode ? 'Update' : 'Create' }}
          </button>
          <button type="button" (click)="onCancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .project-form {
      max-width: 960px;
      margin: 32px auto;
      padding: 28px 30px;
      background: rgba(12, 15, 25, 0.6);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.35);
      color: #e9edf6;
    }
    h2 { margin: 0 0 20px; font-size: 22px; letter-spacing: .5px; }
    form { display: grid; grid-template-columns: 1fr; gap: 16px; }
    @media (min-width: 820px) {
      form { grid-template-columns: 1fr 1fr; }
      .form-group.full, fieldset.full { grid-column: 1 / -1; }
    }
    .form-group { display: flex; flex-direction: column; gap: 8px; }
    label { font-size: 12px; letter-spacing: .4px; color: #aab3c5; }
    .req { color: #ff6b6b; }
    *, *::before, *::after { box-sizing: border-box; }
    input, textarea, select {
      width: 100%;
      padding: 10px 12px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      color: #e9edf6;
      border-radius: 8px;
      outline: none;
      transition: border-color .2s, box-shadow .2s, background .2s;
    }
    .invalid { border-color: #ff6b6b !important; }
    .error { color: #ff8e8e; font-size: 12px; }
    input::placeholder, textarea::placeholder { color: #8692aa; }
    textarea { min-height: 110px; resize: vertical; }
    input:focus, textarea:focus, select:focus { border-color: #7a7cff; box-shadow: 0 0 0 3px rgba(122,124,255,.12); background: rgba(255,255,255,0.06); }

    fieldset { border: 1px solid rgba(255,255,255,0.12); padding: 14px; border-radius: 10px; }
    legend { padding: 0 8px; color: #aab3c5; font-size: 12px; }
    fieldset .form-group { margin: 0; }
    fieldset input { margin-bottom: 10px; width: 100%; }

    .image-preview { max-width: 220px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.12); }

    .form-actions { grid-column: 1 / -1; display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px; }
    button { padding: 10px 18px; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; letter-spacing: .3px; }
    button[type="submit"] { background: linear-gradient(135deg,#7a7cff,#5db1ff); color: white; }
    button[type="submit"]:hover { filter: brightness(1.05); }
    button[type="button"] { background: rgba(255,255,255,0.08); color: #e9edf6; }
    button[type="button"]:hover { background: rgba(255,255,255,0.12); }
  `]
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  isEditMode = false;
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  imageRequiredError = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      name: [''],
      rating: [''],
      status: ['active'],
      dates: [''],
      type: [''],
      description: [''],
      technologies: [''],
      req_cpu: [''],
      req_ram: [''],
      req_storage: [''],
      req_os: [''],
      m_website: [''],
      m_twitter: [''],
      m_discord: [''],
      m_telegram: [''],
      m_github: [''],
      m_youtube: [''],
      m_email: ['']
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.projectService.getProject(+id).subscribe(project => {
        this.projectForm.patchValue({
          title: project.title,
          name: (project as any).name || '',
          rating: (project as any).rating || '',
          status: (project as any).status || 'active',
          dates: (project as any).dates || '',
          type: (project as any).type || '',
          description: project.description,
          technologies: project.technologies?.join(', ') || '',
          req_cpu: (project as any)?.requirements?.cpu || '',
          req_ram: (project as any)?.requirements?.ram || '',
          req_storage: (project as any)?.requirements?.storage || '',
          req_os: (project as any)?.requirements?.os || '',
          m_website: (project as any)?.media?.website || '',
          m_twitter: (project as any)?.media?.twitter || '',
          m_discord: (project as any)?.media?.discord || '',
          m_telegram: (project as any)?.media?.telegram || '',
          m_github: (project as any)?.media?.github || '',
          m_youtube: (project as any)?.media?.youtube || '',
          m_email: (project as any)?.media?.email || ''
        });
        this.imagePreview = project.imageType && project.image ? `data:${project.imageType};base64,${project.image}` : null;
      });
    }
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => { this.imagePreview = reader.result as string; };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.imageRequiredError = !this.isEditMode && !this.selectedFile;
    if (this.projectForm.valid && !this.imageRequiredError) {
      const formData = new FormData();
      const v = this.projectForm.value;

      formData.append('title', v.title);
      if (v.name) formData.append('name', v.name);
      if (v.rating) formData.append('rating', v.rating);
      if (v.status) formData.append('status', v.status);
      if (v.dates) formData.append('dates', v.dates);
      if (v.type) formData.append('type', v.type);
      if (v.description) formData.append('description', v.description);
      if (v.technologies) {
        const technologiesCsv = v.technologies.split(',').map((t: string) => t.trim()).filter((t: string) => !!t).join(',');
        formData.append('technologies', technologiesCsv);
      }
      formData.append('requirements', JSON.stringify({ cpu: v.req_cpu, ram: v.req_ram, storage: v.req_storage, os: v.req_os }));
      formData.append('media', JSON.stringify({ website: v.m_website, twitter: v.m_twitter, discord: v.m_discord, telegram: v.m_telegram, github: v.m_github, youtube: v.m_youtube, email: v.m_email }));

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      if (this.isEditMode) {
        const id = this.route.snapshot.paramMap.get('id');
        this.projectService.updateProject(+id!, formData).subscribe(() => { this.router.navigate(['/admin/projects']); });
      } else {
        this.projectService.createProject(formData).subscribe(() => { this.router.navigate(['/admin/projects']); });
      }
    }
  }

  onCancel() { this.router.navigate(['/admin/projects']); }
} 