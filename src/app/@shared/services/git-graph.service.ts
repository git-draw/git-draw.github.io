import {Injectable} from '@angular/core';
import { createGitgraph } from '@gitgraph/js';
import {HelpModalComponent} from '../shared-components/help-modal/help-modal.component';
import {ModalService} from '../modal/modal.service';
import {Subject} from 'rxjs';
import {Command} from '../modes/git-graph.model';

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
    this.commandHistory.push({
      type: 'input',
      command
    });
    this.commandHistoryChange.next(this.commandHistory);

    return new Promise((resolve, reject) => {
      switch (command) {
        case 'help':
          this.modalService.open(HelpModalComponent);
          return resolve('');
        case 'clear':
          this.commandHistory = [];
          this.commandHistoryChange.next(this.commandHistory);
          return resolve('');
        default:
          return reject('Invalid command');
      }
    });
  }
}
