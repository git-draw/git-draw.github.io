import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypingDirective } from './typing/typing.directive';



@NgModule({
  declarations: [
    TypingDirective
  ],
  exports: [
    TypingDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
