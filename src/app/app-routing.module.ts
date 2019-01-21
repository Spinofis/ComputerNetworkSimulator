import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './ui/layout/layout.component';

const routes: Routes = [
  {
    path: "graph",
    loadChildren: "./graph/graph.module#GraphModule"
    // path:"",
    // component:LayoutComponent,
    // children:[
    //   {
    //     path: "graph",
    //     loadChildren: "./graph/graph.module#GraphModule"
    //   },
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
