import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPopComponent } from './chat-pop/chat-pop.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component';
import {ModalModule} from '../modal/modal.module';
import {DirectivesModule} from '../directives/directives.module';
import { HelpModalComponent } from './help-modal/help-modal.component';



@NgModule({
  declarations: [
    ChatPopComponent,
    ChatBubbleComponent,
    HelpModalComponent
  ],
  exports: [
    ChatPopComponent,
    ChatBubbleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    DirectivesModule
  ]
})
export class SharedComponentsModule { }
