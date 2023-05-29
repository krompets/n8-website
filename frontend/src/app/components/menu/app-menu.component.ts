import { Component } from '@angular/core';
import { ScrollService } from "../../services/scroll.service";
import { EAnchor } from "../../types/types";

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.less']
})
export class AppMenuComponent {
  anchor = EAnchor;

  constructor(public scroll: ScrollService) {}
}
