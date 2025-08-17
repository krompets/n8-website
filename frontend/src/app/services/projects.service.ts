import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { map, distinctUntilChanged } from 'rxjs/operators';
import { PROJECTS } from "../datasource/projects";
import { EProjectStatus, IFilters, IProjects, IProjectsCounter, IProject } from "../types/types";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  projects$ = new BehaviorSubject<IProjects>({});
  projectsCounter$ = new BehaviorSubject<IProjectsCounter>({
    total: 0,
    shown: 0
  });

  filterSubject$ = new BehaviorSubject<IFilters>({
    status: EProjectStatus.active,
    pageSize: 8}
  );

  private loaded = false;
  allProjectsSubject$ = new BehaviorSubject<IProjects>({});
  ready$ = new BehaviorSubject<boolean>(false);
  private allProjects: IProjects = {};

  constructor(private http: HttpClient) {
    this.bootstrap();
  }

  private bootstrap() {
    // Start from static projects
    this.allProjects = { ...PROJECTS };
    this.allProjectsSubject$.next(this.allProjects);
    // Load dynamic projects and merge (static wins on key conflicts)
    this.http.get<IProject[]>(`${environment.apiUrl}/projects`).subscribe({
      next: (list) => {
        const apiMap: IProjects = {};
        for (const p of list) {
          // expect p.name as key
          // ensure icon is a URL to backend icon endpoint or provided as is
          apiMap[(p as any).name] = p;
        }
        this.allProjects = { ...apiMap, ...this.allProjects };
        this.allProjectsSubject$.next(this.allProjects);
        this.loaded = true;
        this.ready$.next(true);
        // trigger initial filter refresh
        this.filterProjects(this.filterSubject$.value);
      },
      error: () => {
        this.loaded = true;
        this.ready$.next(true);
        this.filterProjects(this.filterSubject$.value);
      }
    });
  }

  filterProjects(filters: IFilters) {
    const filtered: IProjects = {};
    let count = 0;
    let sortedObj = {};
    Object.keys(this.allProjects)
      .sort()
      .forEach(key => {
        // @ts-ignore
        sortedObj[key] = this.allProjects[key];
      });
    for (const project in sortedObj) {
      if (count >= filters.pageSize) break;
      if (this.allProjects[project].status === filters.status) {
        filtered[project] = this.allProjects[project];
        count += 1;
      }
    }
    this.projectsCounter$.next({
      total: Object.values(this.allProjects)
        .filter(project => project.status === filters.status)
        .length,
      shown: count
    });
    this.projects$.next(filtered);
  }

  loadProject(name: string) {
    return this.allProjects[name] || null;
  }

  getProject$(name: string): Observable<IProject | null> {
    return this.allProjectsSubject$.pipe(
      map(mapObj => mapObj[name] || null),
      distinctUntilChanged()
    );
  }

  searchProject(searchText = '') {
    let found: IProjects = {};
    if (searchText.trim()) {
      for (const project in PROJECTS) {
        if (PROJECTS[project].name.toLowerCase().includes(searchText.trim().toLowerCase())) {
          found[project] = PROJECTS[project];
        }
      }
    }
    return found;
  }
}
