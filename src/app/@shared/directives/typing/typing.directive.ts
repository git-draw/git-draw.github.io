import {AfterViewInit, Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appTyping]'
})
export class TypingDirective implements OnInit, AfterViewInit {

  private innerHTML: any;
  activeI = 0;
  characterLength = 0;

  constructor(
    private el: ElementRef
  ) {
    // https://codepen.io/tjezidzic/pen/LLWoLw
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_typewriter
  }

  ngAfterViewInit(): void {

    this.innerHTML = this.el.nativeElement.innerHTML;
    this.characterLength = this.innerHTML.length;

    // console.log('char length: ', this.characterLength);
    // this.innerHTML = 'hello world';
    // console.log('element: ', this.innerHTML);
    // var i = 0, isTag, text;
    // (function type() {
    //
    // })();
    this.typing();
  }

  ngOnInit(): void {
    //
    // this.innerHTML = this.el.nativeElement.innerHTML;
    // console.log('element: ', this.innerHTML);
    // // var i = 0, isTag, text;
    // // (function type() {
    // //
    // // })();
    // this.typing();
  }

  typing(): void {
    // Stop when all characters escaped
    if (this.activeI === this.characterLength) {
      return ;
    }

    let isTag = false;
    // console.log(typeof this.innerHTML);
    // console.log(this.innerHTML);

    const text = this.innerHTML.slice(0, ++this.activeI);
    // console.log('text: ', text);

    this.el.nativeElement.innerHTML = text + `<span class='blinker'>&#32;</span>`;
    const char = text.slice(-1);
    // console.log('char: ', char);

    if (char === '<') { isTag = true; }
    if (char === '>') { isTag = false; }
    if (isTag) { return this.typing(); }

    setTimeout(this.typing.bind(this), 60);
  }
}
