import {
  transition,
  trigger,
  style,
  animate
} from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* => *', [
      style({ opacity: 0 }),
      animate(1000, style({opacity: 1}))
    ])
  ]);
