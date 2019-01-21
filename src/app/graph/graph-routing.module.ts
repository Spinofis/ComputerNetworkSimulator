import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { GraphComponent } from "./graph/graph.component";
import { GraphSavedListComponent } from './graph-saved-list/graph-saved-list.component';

const routes: Routes = [
  {
    path: "graph-new",
    component: GraphComponent
  },
  {
    path: "graph-saved-list",
    component: GraphSavedListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphRoutingModule {}
