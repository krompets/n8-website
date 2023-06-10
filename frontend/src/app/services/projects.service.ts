import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { PROJECTS } from "../datasource/projects";
import { EProjectStatus, IFilters, IProjects } from "../types/types";


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  projects$ = new BehaviorSubject<IProjects>({});
  filterSubject$ = new BehaviorSubject<IFilters>({
    status: EProjectStatus.active,
    pageSize: 8}
  );

  filterProjects(filters: IFilters) {
    const filtered: IProjects = {};
    let count = 0;
    for (const project in PROJECTS) {
      if (count >= filters.pageSize) break;
      if (PROJECTS[project].status === filters.status) {
        filtered[project] = PROJECTS[project];
        count += 1;
      }
    }
    this.projects$.next(filtered);
  }

  loadProject(name: string) {
    return PROJECTS[name] || null;
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
