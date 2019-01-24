import { Injectable } from "@angular/core";
import { PcNode } from "../model/d3/pc-node";
import { RouterNode } from "../model/d3/router-node";
import { SwitchNode } from "../model/d3/switch-node";
import { Simulation } from "../model/dto/simulation";
import { Pc } from "../model/dto/pc";
import { Switch } from "../model/dto/switch";
import { Router } from "../model/dto/router";
import { RouterInterface } from "../model/network/router-interface";
import { RouterConfiguration } from "../model/network/router-configuration";
import { Link } from "../model/d3/link";
import { PcSwitch } from "../model/dto/pc-switch";
import { RouterSwitch } from "../model/dto/router-switch";
import { Node } from "../model/d3/node";
import { LinkDto } from "../model/dto/link";

@Injectable()
export class GetGraphApiHelperService {
  public getNodes(simulation: Simulation): Node[] {
    let nodes: Node[] = [];
    let pcNodes = this.getPcNodes(simulation.pcs);
    let routerNodes = this.getRouterNodes(simulation.routers);
    let switchesNodes = this.getSwitchesNodes(simulation.switches);
    pcNodes.forEach(element => {
      nodes.push(element);
    });
    routerNodes.forEach(element => {
      nodes.push(element);
    });
    switchesNodes.forEach(element => {
      nodes.push(element);
    });
    return nodes;
  }

  public getLinks(linksDto: LinkDto[], nodes: Node[]): Link[] {
    let links: Link[] = [];
    linksDto.forEach(element => {
      links.push(new Link(element.nodeNumber1, element.nodeNumber2));
    });

    return links;
  }

  private getPcNodes(pcs: Pc[]): PcNode[] {
    let pcNodes: PcNode[] = [];
    pcs.forEach(element => {
      let pcNode = new PcNode(element.nodeNumber, element.pcNumber);
      pcNode.databaseId = element.id;
      pcNode.pcConfiguration = {
        ip: element.ip,
        gateway: element.gateway,
        mask: element.mask
      };
      pcNodes.push(pcNode);
    });

    return pcNodes;
  }

  private getRouterNodes(routers: Router[]): RouterNode[] {
    let routerNodes: RouterNode[] = [];
    routers.forEach(element => {
      let router = new RouterNode(element.nodeNumber, element.routerNumber);
      router.databaseId = element.id;
      router.routerConfiguration = new RouterConfiguration();
      router.routerConfiguration.interfaces = [];
      this.getInterfaces(element).forEach(element => {
        router.routerConfiguration.interfaces.push(element);
      });
      routerNodes.push(router);
    });

    return routerNodes;
  }

  private getSwitchesNodes(switches: Switch[]): SwitchNode[] {
    let switchesNodes: SwitchNode[] = [];
    switches.forEach(element => {
      let switchNode = new SwitchNode(element.nodeNumber, element.switchNumber);
      switchNode.databaseId = element.id;
      switchesNodes.push(switchNode);
    });

    return switchesNodes;
  }

  private getInterfaces(router: Router): RouterInterface[] {
    let routerInterfaces: RouterInterface[] = [];
    if (router.interfaces) {
      router.interfaces.forEach(element => {
        routerInterfaces.push({
          connectionName: element.name,
          databaseId: element.id,
          ip: element.ipHost,
          mask: element.mask,
          networkIp: element.ipNet,
          nodeConnectedToId: element.connectedNodeNumber
        });
      });
    }

    return routerInterfaces;
  }

  private getNode(nodeNumber: string, nodes: Node[]) {
    return nodes.find(x => x.id == nodeNumber);
  }
}
