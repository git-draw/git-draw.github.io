import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {GitgraphOptions} from '@gitgraph/core';
import {GitGraphService} from '../../../@shared/services/git-graph.service';
import {Command} from '../../../@shared/models/git-graph.model';
import {PanZoomAPI, PanZoomConfig} from 'ngx-panzoom';
import html2canvas from 'html2canvas';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.scss']
})
export class GraphContainerComponent implements OnInit, AfterViewInit, OnDestroy {

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

  /**
   * Pan zoom config
   */
  panZoomConfig: PanZoomConfig = new PanZoomConfig();

  /**
   * Pan zoom api
   * @private
   */
  private panZoomApi: PanZoomAPI | any;

  /**
   * Pan zoom API subscription
   * @private
   */
  private panZoomApiSubscribe: Subscription;

  /**
   * Set full screen flag
   * @private
   */
  public isFullScreen = false;

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

    this.panZoomApiSubscribe = this.panZoomConfig.api.subscribe((api: PanZoomAPI) => this.panZoomApi = api);
  }

  /**
   * Subscribe after view init
   */
  ngAfterViewInit(): void {
    // set html to canvas
    html2canvas(document.getElementById('pan-container') as HTMLElement).then(canvas => {
      console.log('canvas: ', canvas);
    });
  }

  ngOnInit(): void {
    const container = document.getElementById('git-graph') as HTMLElement;
    this.gitGraphService.initialize(container, this.gitGraphOptions);

    // Center pan zoom content
    this.centerContent();
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

  /**
   * Capture image
   */
  captureImage(): void {
    html2canvas(document.getElementById('pan-container') as HTMLElement).then(canvas => {
      const a = document.createElement('a');
      a.href = canvas.toDataURL();
      a.download = 'git-draw.png';
      a.click();
      a.remove();
    });
  }

  /**
   * Center content
   */
  centerContent(): void {
    console.log('Centering content');
    this.panZoomApi.centerContent();
  }

  /**
   * Full screen
   */
  fullScreen(): void {
    const elem = document.documentElement;

    if (this.isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) { /* Safari */
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) { /* IE11 */
        (document as any).msExitFullscreen();
      }

      this.isFullScreen = false;
    } else {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) { /* Safari */
        (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) { /* IE11 */
        (elem as any).msRequestFullscreen();
      }

      this.isFullScreen = true;
    }
  }

  /**
   * On component destroy
   */
  ngOnDestroy(): void {
    if (this.panZoomApiSubscribe) {
      this.panZoomApiSubscribe.unsubscribe();
    }
  }
}
