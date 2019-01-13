import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { GraphComponent } from "./graph/graph.component";

const routes: Routes = [
  {
    path: "",
    component: GraphComponent,
    data: {
      title: "Graf"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphRoutingModule {}
