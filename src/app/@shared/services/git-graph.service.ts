import {Injectable} from '@angular/core';
import { createGitgraph } from '@gitgraph/js';
import {HelpModalComponent} from '../shared-components/help-modal/help-modal.component';
import {ModalService} from '../modal/modal.service';
import {Subject} from 'rxjs';
import {Command, CommandFlow, CommandTypes} from '../modes/git-graph.model';

@Injectable({
  providedIn: 'root'
})
export class GitGraphService {

  /**
   * Active branch
   */
  activeBranch = 'master';

  /**
   * List of all checkout branches
   */
  allBranches = ['master'];

  /**
   * Store git graph object
   * @private
   */
  private gitGraph: any;
  private a: any;

  /**
   * Save command history
   */
  public commandHistory: Array<Command> = [];

  /**
   * Subject emit on command history change
   */
  public commandHistoryChange: Subject<Array<Command>> = new Subject<Array<Command>>();

  constructor(
    private modalService: ModalService
  ) {
  }

  /**
   * Initialize git graph container
   * @param container HTMLElement
   */
  public initialize(container: HTMLElement): void {
    this.gitGraph = createGitgraph(container);
  }

  public commit(message: string): void {
    this.a = this.gitGraph.branch(this.activeBranch);
    this.a.commit(message);
  }

  /**
   * Process command
   * @param command Command from user
   */
  public processCommand(command: string): Promise<boolean|string> {
    this.updateCommandHistory('input', command);

    return new Promise((resolve, reject) => {
      switch (command) {
        case 'help':
          this.modalService.open(HelpModalComponent);
          return resolve('');
        case 'clear':
          this.clearCommandHistory();
          return resolve('');
        case 'hello':
          this.updateCommandHistory('output', 'Hello user, Hope you are doing well!', 'info');
          return resolve('');
        case 'developer':
          this.addDeveloperInfo();
          return resolve('');
        default:
          if (command.startsWith('who are you') || command.toLowerCase() === 'who') {
            this.updateCommandHistory(
              'output',
              `Glad to know, you want to know about me. I'm Git-Draw developed by Anuj Sharma.To know more, type <b><i>developer</i></b>`,
              'info'
            );
            return resolve('');
          } else {
            this.updateCommandHistory('output', 'Invalid command', 'error');
            return reject('Invalid command');
          }
      }
    });
  }

  /**
   * Add developer info
   * @private
   */
  private addDeveloperInfo(): void {
    const info = `I\'m Anuj Sharma, full stack developer, working most of the time writing new codes in Django and Angular.<br>` +
      `Email: <a href="mailto:hello@anujs.in" target="_blank">hello@anujs.in</a> <br>` +
      `Website: <a href="https://anujs.in" target="_blank">www.anujs.in</a>`;

    this.updateCommandHistory('output', info, 'info');
  }

  /**
   * Update command history
   * @param flow Type of command input|output
   * @param command Command to update
   * @param type Type of command CommandTypes
   * @private
   */
  private updateCommandHistory(flow: CommandFlow, command: string, type?: CommandTypes): void {
    this.commandHistory.push({
      flow,
      command,
      type
    });

    this.commandHistoryChange.next(this.commandHistory);
  }

  /**
   * Clear command history
   * @private
   */
  private clearCommandHistory(): void {
    this.commandHistory = [];
    this.commandHistoryChange.next(this.commandHistory);
  }
}
