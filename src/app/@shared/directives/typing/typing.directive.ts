import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appTyping]'
})
export class TypingDirective implements OnInit{

  private innerHTML: any;
  activeI = 0;
  constructor(
    private el: ElementRef
  ) {
    // https://codepen.io/tjezidzic/pen/LLWoLw
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_typewriter
  }

  ngOnInit(): void {

    this.innerHTML = this.el.nativeElement.innerHTML;
    console.log('element: ', this.innerHTML);
    // var i = 0, isTag, text;
    // (function type() {
    //
    // })();
    this.typing();
  }

  typing(): void {
    let isTag = false;
    const text = this.innerHTML.slice(0, ++this.activeI);
    if (text === this.innerHTML) { return; }
    this.el.nativeElement.innerHTML = text + `<span class='blinker'>&#32;</span>`;
    const char = text.slice(-1);
    if (char === '<') { isTag = true; }
    if (char === '>') { isTag = false; }
    if (isTag) { return this.typing(); }
    setTimeout(this.typing, 60);
  }
}
