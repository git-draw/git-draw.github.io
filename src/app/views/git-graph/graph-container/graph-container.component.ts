import { Component, OnInit } from '@angular/core';
import {GitgraphOptions} from '@gitgraph/core';
import {GitGraphService} from '../../../@shared/services/git-graph.service';
import {Command} from '../../../@shared/modes/git-graph.model';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.scss']
})
export class GraphContainerComponent implements OnInit {

  /**
   * Save command history
   */
  public history: Array<Command> = [];

  /**
   * Save active branch name
   */
  public activeBranch = '';

  /**
   * Set git graph options
   * @private
   */
  private gitGraphOptions: GitgraphOptions = {
    author: 'user'
  };

  constructor(
    private gitGraphService: GitGraphService
  ) {
    // Subscribe to command history change
    this.gitGraphService.commandHistoryChange.subscribe(res => {
      this.history = res;
    });

    // Subscribe to branch name change
    this.gitGraphService.branchChange.subscribe(res => {
      this.activeBranch = res;
    });
  }

  ngOnInit(): void {
    const container = document.getElementById('git-graph') as HTMLElement;
    this.gitGraphService.initialize(container, this.gitGraphOptions);
  }

  /**
   * On command output
   * @param $event Command string
   */
  onCommandOutput($event: string): void {
    // this.history.push($event);
    this.gitGraphService.processCommand($event).then(res => {
      console.log('Response: ', res);
    }).catch(err => {
      console.log('Error: ', err);
    });
    console.log('command received: ', $event);
  }
}
