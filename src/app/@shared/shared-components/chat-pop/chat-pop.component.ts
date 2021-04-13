import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../modal/modal.service';
import {HelpModalComponent} from '../help-modal/help-modal.component';
import {Command} from '../../modes/git-graph.model';

@Component({
  selector: 'app-chat-pop',
  templateUrl: './chat-pop.component.html',
  styleUrls: ['./chat-pop.component.scss']
})
export class ChatPopComponent implements OnInit {

  @Input() history: Array<Command> = [];

  @Output() commandOutput: EventEmitter<string> = new EventEmitter<string>();

  public toggled = false;

  public activeBranch = 'master';

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      command: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void {
    if (!this.history.length) {
      this.toggle();
    }
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

    // this.history.push(command);

    // this.processCommand(command);
    this.commandOutput.emit(command);
    this.form.reset();
  }

  // /**
  //  * Process command
  //  * @param command Command to process
  //  * @private
  //  */
  // private processCommand(command: string): void {
  //   switch (command) {
  //     case 'help':
  //       console.log('opening modal');
  //       this.modalService.open(HelpModalComponent);
  //       break;
  //     case 'clear':
  //       console.log('clearing command history');
  //       this.commandHistory = [];
  //       break;
  //   }
  // }
}
