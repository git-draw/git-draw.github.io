import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import {DirectivesModule} from '../directives/directives.module';



@NgModule({
  declarations: [
    ModalComponent,
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
