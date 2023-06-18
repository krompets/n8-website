import { Component, OnInit } from '@angular/core';
import { EAnchor, EProjectStatus, IFilters } from "../../types/types";
import { ScrollService } from "../../services/scroll.service";
import { Router } from "@angular/router";
import { ProjectsService } from "../../services/projects.service";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.less'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(600, style({opacity: 1}))
      ])
    ])
  ]
})
export class AppContentComponent implements OnInit {
  anchor = EAnchor;
  advantageAccordionState = {
    card1: true,
    card2: true,
    card3: true
  }
  showPaginator = false;

  filters = EProjectStatus;
  SMALL_SCREEN_SIZE = false;
  CARDS = [];

  CURRENT_PROJECTS: any[] = [];
  currentFilters: IFilters = {
    status: EProjectStatus.active,
    pageSize: 8
  };

  constructor(public scroll: ScrollService,
              private router: Router,
              public projectsService: ProjectsService
  ) {
  }

  ngOnInit() {
    this.checkScreenSize();
    this.projectsService.filterSubject$.subscribe((filters) => {
      this.projectsService.filterProjects(filters);
    })
    this.checkPaginator();
  }

  setFilter(status: EProjectStatus) {
    this.currentFilters.status = status;
    this.doFilter();
  }

  doFilter() {
    this.projectsService.filterSubject$.next(this.currentFilters);
    this.checkPaginator();
  }

  checkScreenSize() {
    this.SMALL_SCREEN_SIZE = window.innerWidth < 768;
    if(this.SMALL_SCREEN_SIZE) {
      this.currentFilters.pageSize = 6;
      this.advantageAccordionState.card1 = false;
      this.advantageAccordionState.card2 = false;
      this.advantageAccordionState.card3 = false;
    } else {
      this.currentFilters.pageSize = 8;
      this.advantageAccordionState.card1 = true;
      this.advantageAccordionState.card2 = true;
      this.advantageAccordionState.card3 = true;
    }
    this.doFilter();
  }

  showMore() {
    this.currentFilters.pageSize = this.currentFilters.pageSize * 2;
    this.doFilter();
  }

  checkPaginator() {
    this.showPaginator = this.projectsService.projectsCounter$.value.total > this.projectsService.projectsCounter$.value.shown;
  }
}
