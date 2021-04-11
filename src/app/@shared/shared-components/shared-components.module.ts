import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPopComponent } from './chat-pop/chat-pop.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component';



@NgModule({
  declarations: [
    ChatPopComponent,
    ChatBubbleComponent
  ],
  exports: [
    ChatPopComponent,
    ChatBubbleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedComponentsModule { }
