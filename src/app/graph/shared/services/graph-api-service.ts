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

@Injectable()
export class GraphApiService {
  public saveSimulation(nodes: Node[], links: Link[], simulationId: number) {
    let simulation: Simulation = new Simulation();
    simulation.id = simulationId;
  }

  private getPcNodes(nodes: Node[]): Pc[] {
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
          mask: pcNode.pcConfiguration ? pcNode.pcConfiguration.mask : ""
        });
      }
    });

    return pcs;
  }

  private getRouterNodes(nodes: Node[]) {
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

//   private getSwitchNodes(nodes: Node[]): Switch[] {
//     let switches: Switch[] = [];

//     nodes.forEach(node => {
//       if (node instanceof PcNode) {
//         let pcNode = node as PcNode;
//         switches.push({
//           id: pcNode.databaseId,
//           name: pcNode.getName(),
//           pcNumber: pcNode.pcNumber,
//           nodeNumber: pcNode.id,
//           ip: pcNode.pcConfiguration ? pcNode.pcConfiguration.ip : "",
//           mask: pcNode.pcConfiguration ? pcNode.pcConfiguration.mask : ""
//         });
//       }
//     });

//     return switches;
//   }
}
