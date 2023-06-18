import { Component} from '@angular/core';
import { IProject, IProjects } from "../../types/types";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectsService } from "../../services/projects.service";

@Component({
  selector: 'project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.less']
})
export class ProjectPageComponent {
  searchQuery: any;
  searchResults: IProjects | any;
  project: IProject | any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name = params['name'];
      this.project = this.projectsService.loadProject(name)
    });
  }

  search() {
    if (this.searchQuery.trim()) {
      this.searchResults = this.projectsService.searchProject(this.searchQuery);
    } else {
      this.clearSearch();
    }
  }

  clearSearch() {
    this.searchResults = null;
    this.searchQuery = '';
  }

  navigateToProject(key: any) {
    this.clearSearch();
    this.router.navigate(['/project', key]);
  }
}
