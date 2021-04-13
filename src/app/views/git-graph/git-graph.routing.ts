import {RouterModule, Routes} from '@angular/router';
import {GraphContainerComponent} from './graph-container/graph-container.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: GraphContainerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class GitGraphRouting {}
