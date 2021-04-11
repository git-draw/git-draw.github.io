import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent implements OnInit {

  public toggled = false;

  constructor() { }

  ngOnInit(): void {
  }

  public toggle(): void {
    this.toggled = !this.toggled;
  }
}
