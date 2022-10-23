import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[myDropDown]',
})
export class DropDown {
  @HostBinding('class.open') isOpen: boolean = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
