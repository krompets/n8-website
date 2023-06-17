import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { PROJECTS } from "../datasource/projects";
import { EProjectStatus, IFilters, IProjects, IProjectsCounter } from "../types/types";


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

  filterProjects(filters: IFilters) {
    const filtered: IProjects = {};
    let count = 0;
    let sortedObj = {};
    Object.keys(PROJECTS)
      .sort()
      .forEach(key => {
        // @ts-ignore
        sortedObj[key] = filtered[key];
      });
    for (const project in sortedObj) {
      if (count >= filters.pageSize) break;
      if (PROJECTS[project].status === filters.status) {
        filtered[project] = PROJECTS[project];
        count += 1;
      }
    }
    this.projectsCounter$.next({
      total: Object.values(PROJECTS)
        .filter(project => project.status === filters.status)
        .length,
      shown: count
    });
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
