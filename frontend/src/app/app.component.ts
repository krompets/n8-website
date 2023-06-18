import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { slideInAnimation } from "./route-animation";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [ slideInAnimation ]
})
export class AppComponent {
  windowScrolled: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: Router
  ) { }

  @HostListener("window:scroll", [])

  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  getAnimation() {
    return this.route.url;
  }
}
