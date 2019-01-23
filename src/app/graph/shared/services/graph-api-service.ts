import { Injectable, Type } from "@angular/core";
import { Node } from "../model/d3/node";
import { Link } from "../model/d3/link";
import { Simulation } from "../model/dto/simulation";
import { PcNode } from "../model/d3/pc-node";
import { Pc } from "../model/dto/pc";
import { Router } from "../model/dto/router";
import { RouterNode } from "../model/d3/router-node";
import { RouterInterfaceDTO } from "../model/dto/router-interface";
import { RouterInterface } from "../model/network/router-interface";
import { RouterConfiguration } from "../model/network/router-configuration";
import { Switch } from "../model/dto/switch";
import { SwitchNode } from "../model/d3/switch-node";
import { PcSwitch } from "../model/dto/pc-switch";
import { RouterSwitch } from "../model/dto/router-switch";
import { BaseService } from 'src/app/shared/base-service';
import { ApiUrl } from '../enums/api-url';
import { Observable } from 'rxjs';

@Injectable()
export class GraphApiService extends BaseService{
  public saveSimulation(nodes: Node[], links: Link[], simulationId: number):Observable<Simulation> {
    let simulation: Simulation = new Simulation();
    simulation.id = simulationId;
    simulation.pcs = this.getPcs(nodes);
    simulation.routers = this.getRouters(nodes);
    simulation.switches = this.getSwitches(nodes);
    simulation.pcSwitches = this.getPcSwitches(
      simulation.pcs,
      simulation.switches,
      links
    );
    simulation.routerSwitches = this.getRouterSwitch(
      simulation.routers,
      simulation.switches,
      links
    );
    return this.post(ApiUrl.saveSimulation,simulation);
  }

  private getPcs(nodes: Node[]): Pc[] {
    let pcs: Pc[] = [];

    nodes.forEach(node => {
      if (node instanceof PcNode) {
        let pcNode = node as PcNode;
        pcs.push({
          id: pcNode.databaseId,
          name: pcNode.getName(),
          pcNumber: pcNode.pcNumber,
          nodeNumber: pcNode.id,
          ip: pcNode.pcConfiguration ? pcNode.pcConfiguration.ip : "",
          mask: pcNode.pcConfiguration ? pcNode.pcConfiguration.mask : "",
          gateway: pcNode.pcConfiguration ? pcNode.pcConfiguration.gateway : ""
        });
      }
    });

    return pcs;
  }

  private getRouters(nodes: Node[]) {
    let routers: Router[] = [];

    nodes.forEach(node => {
      if (node instanceof RouterNode) {
        let routerNode = node as RouterNode;
        routers.push({
          id: routerNode.databaseId,
          name: routerNode.getName(),
          nodeNumber: routerNode.id,
          routerNumber: routerNode.routerNumber,
          interfaces: this.getRouterInterfaces(routerNode.routerConfiguration)
        });
      }
    });

    return routers;
  }

  private getRouterInterfaces(
    routerConfiguration: RouterConfiguration
  ): RouterInterfaceDTO[] {
    if (!routerConfiguration) return [];

    let interfacesDTO: RouterInterfaceDTO[] = [];
    routerConfiguration.interfaces.forEach(element => {
      interfacesDTO.push({
        id: element.databaseId,
        name: element.connectionName,
        ipHost: element.ip,
        ipNet: element.networkIp,
        mask: element.mask
      });
    });

    return interfacesDTO;
  }

  private getSwitches(nodes: Node[]): Switch[] {
    let switches: Switch[] = [];

    nodes.forEach(node => {
      if (node instanceof SwitchNode) {
        let switchNode = node as SwitchNode;
        switches.push({
          id: switchNode.databaseId,
          name: switchNode.getName(),
          nodeNumber: switchNode.id,
          switchNumber: switchNode.switchNumber
        });
      }
    });

    return switches;
  }

  private getPcSwitches(pcs: Pc[], switches: Switch[], link: Link[]) {
    let pcSwitch: PcSwitch[] = [];

    link.forEach(element => {
      if (
        element.source instanceof SwitchNode &&
        element.target instanceof PcNode
      ) {
        let switchh = switches.find(
          x => x.nodeNumber == (element.source as SwitchNode).id
        );
        let pc = pcs.find(x => x.nodeNumber == (element.target as PcNode).id);
        pcSwitch.push({
          pc: pc,
          switch: switchh
        });
      }

      if (
        element.source instanceof PcNode &&
        element.target instanceof SwitchNode
      ) {
        let pc = pcs.find(x => x.nodeNumber == (element.source as PcNode).id);
        let switchh = switches.find(
          x => x.nodeNumber == (element.target as SwitchNode).id
        );

        pcSwitch.push({
          pc: pc,
          switch: switchh
        });
      }
    });

    return pcSwitch;
  }

  private getRouterSwitch(
    routers: Router[],
    switches: Switch[],
    link: Link[]
  ): RouterSwitch[] {
    let routerSwitch: RouterSwitch[] = [];

    link.forEach(element => {
      if (
        element.source instanceof SwitchNode &&
        element.target instanceof RouterNode
      ) {
        let switchh = switches.find(
          x => x.nodeNumber == (element.source as SwitchNode).id
        );
        let router = routers.find(
          x => x.nodeNumber == (element.target as RouterNode).id
        );
        routerSwitch.push({
          router: router,
          switch: switchh
        });
      }

      if (
        element.source instanceof RouterNode &&
        element.target instanceof SwitchNode
      ) {
        let router = routers.find(
          x => x.nodeNumber == (element.source as RouterNode).id
        );
        let switchh = switches.find(
          x => x.nodeNumber == (element.target as SwitchNode).id
        );

        routerSwitch.push({
          router: router,
          switch: switchh
        });
      }
    });

    return routerSwitch;
  }
}
