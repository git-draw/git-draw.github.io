import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphContainerComponent} from './graph-container/graph-container.component';
import {GitGraphRouting} from './git-graph.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedComponentsModule} from '../../@shared/shared-components/shared-components.module';
import {NgxPanZoomModule} from 'ngx-panzoom';

@NgModule({
    imports: [
        CommonModule,
        GitGraphRouting,
        ReactiveFormsModule,
        SharedComponentsModule,
        NgxPanZoomModule
    ],
  declarations: [
    GraphContainerComponent
  ]
})
export class GitGraphModule {}
