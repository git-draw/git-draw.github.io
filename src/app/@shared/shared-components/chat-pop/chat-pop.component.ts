import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../modal/modal.service';
import {HelpModalComponent} from '../help-modal/help-modal.component';

@Component({
  selector: 'app-chat-pop',
  templateUrl: './chat-pop.component.html',
  styleUrls: ['./chat-pop.component.scss']
})
export class ChatPopComponent implements OnInit {

  public toggled = false;

  public commandHistory = [
    'git checkout master',
    'git commit -m "hello world"'
  ];

  public activeBranch = 'master';

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
    this.form = this.fb.group({
      command: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void {
  }

  public toggle(): void {
    this.toggled = !this.toggled;
  }

  /**
   * Form submit
   */
  public submit(): void | boolean {
    if (this.form.invalid) {
      return false;
    }

    const command = this.form.value.command;

    this.processCommand(command);

    this.commandHistory.push(command);
    this.form.reset();
  }

  /**
   * Process command
   * @param command Command to process
   * @private
   */
  private processCommand(command: string): void {
    switch (command) {
      case 'help':
        console.log('opening modal');
        this.modalService.open(HelpModalComponent);
        break;
    }
  }
}
