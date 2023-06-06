import { Component, HostListener, OnInit } from '@angular/core';
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
export class AppContentComponent implements OnInit {
  anchor = EAnchor;
  advantageAccordionState = {
    card1: true,
    card2: true,
    card3: true
  }

  filters = Filters;
  SMALL_SCREEN_SIZE = false;
  PAGE_SIZE = 8;
  CARDS = [];

  ALL_CARDS = {
    active: [
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'obol.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'solana.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'}
    ],
    upcoming: [
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'obol.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'solana.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'obol.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'solana.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'}
    ],
    ended: [
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'obol.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'solana.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'obol.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'solana.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'},
      {icon: 'harmony.png', title: 'Harmony', rating: 'Not rated'}
    ]
  };

  CURRENT_CARDS: any[] = [];
  currentFilter = Filters.active;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.checkScreenSize();
  }

  constructor(public scroll: ScrollService) {
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  setFilter(filter: Filters) {
    this.currentFilter = filter;
    this.CURRENT_CARDS = this.ALL_CARDS[filter].slice(0, this.PAGE_SIZE);
  }

  checkScreenSize() {
    this.SMALL_SCREEN_SIZE = window.innerWidth < 768;
    if(this.SMALL_SCREEN_SIZE) {
      this.PAGE_SIZE = 6;
      this.advantageAccordionState.card1 = false;
      this.advantageAccordionState.card2 = false;
      this.advantageAccordionState.card3 = false;
    } else {
      this.PAGE_SIZE = 8;
      this.advantageAccordionState.card1 = true;
      this.advantageAccordionState.card2 = true;
      this.advantageAccordionState.card3 = true;
    }
    this.CURRENT_CARDS = this.ALL_CARDS[this.currentFilter]
      .slice(0, this.PAGE_SIZE);
  }

  showMore() {
    const visibleCount = this.CURRENT_CARDS.length;
    const allCount = this.ALL_CARDS[this.currentFilter].length;
    if (visibleCount < allCount) {
      this.CURRENT_CARDS = this.ALL_CARDS[this.currentFilter].slice(0, allCount);
    }
  }
}
