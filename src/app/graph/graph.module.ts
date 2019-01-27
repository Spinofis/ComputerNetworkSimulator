import { NgModule } from "@angular/core";
import { GraphRoutingModule } from "./graph-routing.module";
import { GraphComponent } from "./graph/graph.component";
import { D3Service } from "./shared/services/d3.service";
import { GraphService } from "./shared/services/graph-service";
import { DraggableDirective } from "./shared/directives/draggable.directive";
import { ZoomableDirective } from "./shared/directives/zoomable.directive";
import { LinkVisualComponent } from "./link-visual/link-visual.component";
import { NodeVisualComponent } from "./node-visual/node-visual.component";
import { CommonModule } from "@angular/common";
import { GraphMenu } from "./graph-menu/graph-menu.component";
import { NetworkService } from "./shared/services/network-service";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AgGridModule } from "ag-grid-angular";
import { StartSimulationComponent } from "./start-simulation/start-simulation.component";
import { GraphSavedListComponent } from "./graph-saved-list/graph-saved-list.component";
import { GraphApiService } from "./shared/services/graph-api-service";
import { GetGraphApiHelperService } from "./shared/services/get-api-graph-helper.service";
import { HostConfigurator } from "./host-configurator/host-configurator.component";

@NgModule({
  imports: [
    GraphRoutingModule,
    CommonModule,
    NgbModalModule,
    ReactiveFormsModule,
    AgGridModule.withComponents(null)
  ],
  declarations: [
    GraphComponent,
    LinkVisualComponent,
    NodeVisualComponent,
    DraggableDirective,
    ZoomableDirective,
    GraphMenu,
    StartSimulationComponent,
    GraphSavedListComponent,
    HostConfigurator
  ],
  providers: [
    D3Service,
    GraphService,
    NetworkService,
    GraphApiService,
    GetGraphApiHelperService
  ],
  entryComponents: [StartSimulationComponent, HostConfigurator]
})
export class GraphModule {}
