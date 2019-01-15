import { NgModule } from "@angular/core";
import { GraphRoutingModule } from "./grap-routing.module";
import { GraphComponent } from "./graph/graph.component";
import { D3Service } from "./shared/services/d3.service";
import { GraphService } from "./shared/services/graph-service";
import { DraggableDirective } from "./shared/directives/draggable.directive";
import { ZoomableDirective } from "./shared/directives/zoomable.directive";
import { LinkVisualComponent } from "./link-visual/link-visual.component";
import { NodeVisualComponent } from "./node-visual/node-visual.component";
import { CommonModule } from "@angular/common";
import { GraphMenu } from "./graph-menu/graph-menu.component";

@NgModule({
  imports: [GraphRoutingModule, CommonModule],
  declarations: [
    GraphComponent,
    LinkVisualComponent,
    NodeVisualComponent,
    DraggableDirective,
    ZoomableDirective,
    GraphMenu
  ],
  providers: [D3Service, GraphService],
  exports: [
    GraphComponent,
    LinkVisualComponent,
    NodeVisualComponent,
    DraggableDirective,
    ZoomableDirective
  ]
})
export class GraphModule {}
