import { Injectable, Type } from "@angular/core";
import { Node } from "../model/d3/node";
import { Link } from "../model/d3/link";
import { Simulation } from "../model/dto/simulation";
import { BaseService } from "src/app/shared/base-service";
import { ApiUrl } from "../enums/api-url";
import { Observable, of, BehaviorSubject } from "rxjs";
import { SaveGrapHelperService } from "./save-graph-helper-service";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class GraphApiService extends BaseService {
  saveGraphHelper: SaveGrapHelperService = new SaveGrapHelperService();

  public getSimulationList(): Observable<Simulation[]> {
    return this.get(ApiUrl.getSimulationList);
  }

  public saveSimulation(
    nodes: Node[],
    links: Link[],
    simulationId: number
  ): Observable<Simulation> {
    let simulation: Simulation = new Simulation();
    simulation.id = simulationId;
    simulation.pcs = this.saveGraphHelper.getPcs(nodes);
    simulation.routers = this.saveGraphHelper.getRouters(nodes);
    simulation.switches = this.saveGraphHelper.getSwitches(nodes);

    simulation.links = this.saveGraphHelper.getLinks(links);
    return this.post(ApiUrl.saveSimulation, simulation);
  }

  public getSimulation(simId: number): Observable<Simulation> {
    let httpParams = new HttpParams().set("simId", simId.toString());
    var obj = this.get(ApiUrl.getSimulation, httpParams);
    return obj;
  }
}
