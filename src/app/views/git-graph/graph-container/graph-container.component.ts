import { Component, OnInit } from '@angular/core';
import {GitGraphService} from '../../../@shared/services/git-graph.service';
import {Command} from '../../../@shared/modes/git-graph.model';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.scss']
})
export class GraphContainerComponent implements OnInit {
  history: Array<Command> = [];

  constructor(
    private gitGraphService: GitGraphService
  ) {
    this.gitGraphService.commandHistoryChange.subscribe(res => {
      this.history = res;
    });
  }

  ngOnInit(): void {
    const container = document.getElementById('git-graph') as HTMLElement;
    this.gitGraphService.initialize(container);
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
