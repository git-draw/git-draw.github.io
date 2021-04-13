import {Injectable} from '@angular/core';
import { createGitgraph } from '@gitgraph/js';

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

  constructor() {
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
}
