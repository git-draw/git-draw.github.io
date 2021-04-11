import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import {DirectivesModule} from '../directives/directives.module';
import { ModalBodyDirective } from './modal-body/modal-body.directive';



@NgModule({
  declarations: [
    ModalComponent,
    ModalBodyDirective
  ],
  exports: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ]
})
export class ModalModule { }
