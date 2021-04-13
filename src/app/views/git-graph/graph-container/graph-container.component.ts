import { Component, OnInit } from '@angular/core';
import {GitGraphService} from '../../../@shared/services/git-graph.service';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.scss']
})
export class GraphContainerComponent implements OnInit {

  constructor(
    private gitGraphService: GitGraphService
  ) { }

  ngOnInit(): void {
    const container = document.getElementById('git-graph') as HTMLElement;
    this.gitGraphService.initialize(container);
  }
}
