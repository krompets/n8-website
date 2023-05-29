import { Component, ElementRef } from '@angular/core';
import { ScrollService } from "../../services/scroll.service";
import { EAnchor } from "../../types/types";

@Component({
  selector: 'app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.less']
})
export class AppMainComponent {
  anchor = EAnchor;

  constructor(public scroll: ScrollService) {
  }
}
