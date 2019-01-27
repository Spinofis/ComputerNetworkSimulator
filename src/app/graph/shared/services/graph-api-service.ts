import { Injectable, Type } from "@angular/core";
import { Node } from "../model/d3/node";
import { Link } from "../model/d3/link";
import { Simulation } from "../model/dto/simulation";
import { BaseService } from "src/app/shared/base-service";
import { ApiUrl } from "../enums/api-url";
import { Observable, of, BehaviorSubject } from "rxjs";
import { SaveGrapHelperService } from "./save-graph-helper-service";
import { HttpParams } from "@angular/common/http";
import { disableBindings } from "@angular/core/src/render3";

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
    debugger;
    return this.post(ApiUrl.saveSimulation, simulation);
  }

  public getSimulation(simId: number): Observable<Simulation> {
    let httpParams = new HttpParams().set("simId", simId.toString());
    var obj = this.get(ApiUrl.getSimulation, httpParams);
    return obj;
  }

  public pingHost(hostIdentity: string) {
    var request = new XMLHttpRequest();
    request.open(
      "GET",
      this.baseUrl + ApiUrl.pingHost + "/" + hostIdentity,
      false
    ); // `false` makes the request synchronous
    request.send(null);
    return request.response;
  }
}
