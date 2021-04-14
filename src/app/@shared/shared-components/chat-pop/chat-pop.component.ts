import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Command} from '../../models/git-graph.model';

@Component({
  selector: 'app-chat-pop',
  templateUrl: './chat-pop.component.html',
  styleUrls: ['./chat-pop.component.scss']
})
export class ChatPopComponent implements OnInit {

  /**
   * Input active branch
   */
  @Input() activeBranch = 'master';

  /**
   * Input command history
   */
  @Input() history: Array<Command> = [];

  /**
   * Output when user enters a command
   */
  @Output() commandOutput: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Save CLI toggle status
   */
  public toggled = false;

  /**
   * Form group
   */
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

  /**
   * Toggle CLI panel
   */
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

    this.commandOutput.emit(command);
    this.form.reset();
  }
}
