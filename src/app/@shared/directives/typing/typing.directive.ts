import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appTyping]'
})
export class TypingDirective {

  constructor(
    private el: ElementRef
  ) {
    console.log('element: ', el.nativeElement);
  }
}
