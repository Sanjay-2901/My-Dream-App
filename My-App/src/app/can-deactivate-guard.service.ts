import { CanDeactivate } from '@angular/router';

export interface canComponentLeave {
  canLeave: () => boolean;
}

export class canDeactivateGuard implements CanDeactivate<canComponentLeave> {
  canDeactivate(component: canComponentLeave) {
    if (component.canLeave) {
      return component.canLeave();
    } else {
      return true;
    }
  }
}
