import { Component } from '@angular/core';
import { EAnchor } from "../../types/types";
import { ScrollService } from "../../services/scroll.service";

export enum Filters {
  active = 'active',
  upcoming = 'upcoming',
  ended = 'ended'
}

@Component({
  selector: 'app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.less']
})
export class AppContentComponent {
  anchor = EAnchor;

  filters = Filters;
  ALL_CARDS = {
    active: [
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'obol.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'solana.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'}
    ],
    upcoming: [
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'}
    ],
    ended: [
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'}
    ]
  };

  CURRENT_CARDS = this.ALL_CARDS.active;
  currentFilter = Filters.active;

  constructor(public scroll: ScrollService) {
  }
  setFilter(filter: Filters) {
    this.currentFilter = filter;
    this.CURRENT_CARDS = this.ALL_CARDS[filter];
  }
}
