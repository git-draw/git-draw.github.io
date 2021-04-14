import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPopComponent } from './chat-pop/chat-pop.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component';
import {ModalModule} from '../modal/modal.module';
import {DirectivesModule} from '../directives/directives.module';
import { HelpModalComponent } from './help-modal/help-modal.component';
import { HelpContentComponent } from './help-content/help-content.component';



@NgModule({
  declarations: [
    ChatPopComponent,
    ChatBubbleComponent,
    HelpModalComponent,
    HelpContentComponent
  ],
  exports: [
    ChatPopComponent,
    ChatBubbleComponent,
    HelpModalComponent,
    HelpContentComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    DirectivesModule,
    ReactiveFormsModule
  ]
})
export class SharedComponentsModule { }
