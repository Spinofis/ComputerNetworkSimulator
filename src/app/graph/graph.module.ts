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
import { PcConfiguratorComponent } from "./pc-configurator/pc-configurator.component";
import { RouterConfiguratorComponent } from "./router-configurator/router-configurator.component";
import { NetworkService } from "./shared/services/network-service";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { ValidatorService } from "./shared/services/validator-service";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    GraphRoutingModule,
    CommonModule,
    NgbModalModule,
    ReactiveFormsModule
  ],
  declarations: [
    GraphComponent,
    LinkVisualComponent,
    NodeVisualComponent,
    DraggableDirective,
    ZoomableDirective,
    GraphMenu,
    PcConfiguratorComponent,
    RouterConfiguratorComponent
  ],
  providers: [D3Service, GraphService, NetworkService, ValidatorService],
  exports: [
    GraphComponent,
    LinkVisualComponent,
    NodeVisualComponent,
    DraggableDirective,
    ZoomableDirective
  ],
  entryComponents: [PcConfiguratorComponent, RouterConfiguratorComponent]
})
export class GraphModule {}
