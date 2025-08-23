import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appSelectOnFocus]',
})
export class SelectOnFocusDirective {
  private el: ElementRef<HTMLInputElement | HTMLTextAreaElement> = inject(ElementRef);

  @HostListener('focus')
  onFocus() {
    this.el.nativeElement.select();
  }
}
