import {Injectable} from '@angular/core';
import {createGitgraph} from '@gitgraph/js';
import {GitgraphOptions} from '@gitgraph/core';
import {HelpModalComponent} from '../shared-components/help-modal/help-modal.component';
import {ModalService} from '../modal/modal.service';
import {Subject} from 'rxjs';
import {Command, CommandFlow, CommandTypes} from '../modes/git-graph.model';

interface Branch {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class GitGraphService {

  /**
   * Default branch name.
   * This branch will be created at the time of initialization.
   * To override the default branch, pass the default branch name with the initialization method.
   */
  private defaultBranch = 'master';

  /**
   * Active branch
   */
  private activeBranch: any;

  /**
   * Store git graph object
   * @private
   */
  private gitGraph: any;

  /**
   * List all branches
   */
  private branches: Branch = {};

  /**
   * Save command history
   */
  public commandHistory: Array<Command> = [];

  /**
   * Subject emit on command history change
   */
  public commandHistoryChange: Subject<Array<Command>> = new Subject<Array<Command>>();

  /**
   * Emit subject on branch change
   */
  public branchChange: Subject<string> = new Subject<string>();

  constructor(
    private modalService: ModalService
  ) {
  }

  /**
   * Initialize git graph container
   * @param container HTMLElement
   * @param options Options for gitGraph
   * @param defaultBranch Default branch name to use instead of master
   */
  public initialize(container: HTMLElement, options?: GitgraphOptions, defaultBranch?: string): void {
    this.gitGraph = createGitgraph(container, options);

    if (defaultBranch) {
      this.defaultBranch = defaultBranch;
    }

    this.addDefaultBranch();
  }

  /**
   * Add default branch
   * @private
   */
  private addDefaultBranch(): void {
    this.addNewBranch(this.defaultBranch).then();
  }

  // public commit(message: string): void {
  //   this.a = this.gitGraph.branch(this.activeBranch);
  //   this.a.commit(message);
  // }

  /**
   * Process command
   * @param command Command from user
   */
  public processCommand(command: string): Promise<boolean|string> {
    // Trim white spaces
    command = command.trim();

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
          if (command.startsWith('git')) {
            this.processGitCommand(command).then(res => {
              this.updateCommandHistory('output', res, 'success');
              return resolve(res);
            }).catch(err => {
              this.updateCommandHistory('output', err, 'error');
              return reject(err);
            });
          } else if (command.startsWith('who are you') || command.toLowerCase() === 'who') {
            this.addWhoInfo();
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
   * Add who info
   * @private
   */
  private addWhoInfo(): void {
    const info = `Glad to know, you want to know about me. I'm Git-Draw developed by Anuj Sharma.` +
      `To know more, type <b><i>developer</i></b>`;
    this.updateCommandHistory('output', info, 'info');
  }

  /**
   * Process git command
   * @param command Command
   * @private
   */
  private processGitCommand(command: string): Promise<string> {
    const splitCommand = command.split(' ');
    console.log('splitCommand: ', splitCommand);

    return new Promise((resolve, reject) => {
      if (!splitCommand.length) {
        return reject('Empty command');
      }

      if (splitCommand[0] !== 'git') {
        return reject(`Invalid command: ${splitCommand[0]}`);
      }

      switch (splitCommand[1]) {
        case 'checkout':
          if (splitCommand.length > 2) {
            if (splitCommand[2] === '-b') {
              this.addNewBranch(splitCommand[3]).then(() => {
                return resolve(`Switched to a new branch '${splitCommand[3]}'`);
              }).catch(err => {
                return reject(err);
              });
            } else {
              this.switchBranch(splitCommand[2]).then(() => {
                return resolve(`Switched to branch '${splitCommand[2]}`);
              }).catch(err => {
                return reject(err);
              });
            }
          } else {
            return reject('Invalid command');
          }
          break;
        case 'commit':
          if (splitCommand.length > 2 && splitCommand[2] === '-m') {
            this.commitMessage(splitCommand.slice(3).join(' '));
            return resolve(``);
          } else {
            return reject(`Invalid command: ${command}`);
          }
        default:
          return reject('Support not added. Please wait');
      }
    });
  }

  /**
   * Add commit message
   * @param message Commit message
   * @private
   */
  private commitMessage(message: string): void {
    // Remove double quotes
    message.replace(/(^")|("$)/g, '');
    // Remove single quotes
    message.replace(/(^')|('$)/g, '');

    // Add commit message
    this.activeBranch.commit(message);
  }

  /**
   * Add new branch to the list
   * @param branchName Branch name to add
   * @private
   */
  private addNewBranch(branchName: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (Object.keys(this.branches).includes(branchName)) {
        return reject(`fatal: A branch named '${branchName}' already exists`);
      }

      this.branches[branchName] = this.gitGraph.branch(branchName);

      // Switch branch
      await this.switchBranch(branchName);

      return resolve(branchName);
    });
  }

  /**
   * Switch to branch
   * @param branchName Branch name to switch
   * @private
   */
  private switchBranch(branchName: string): Promise<string> {

    return new Promise((resolve, reject) => {
      if (!Object.keys(this.branches).includes(branchName)) {
        return reject('Branch does not exists. Use -b to create new branch');
      }

      this.activeBranch = this.branches[branchName];

      // Emit branch name as branch change
      this.branchChange.next(branchName);

      return resolve(this.activeBranch);
    });
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
