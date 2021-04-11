import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    private fb: FormBuilder
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

    this.commandHistory.push(this.form.value.command);
    this.form.reset();
  }
}
