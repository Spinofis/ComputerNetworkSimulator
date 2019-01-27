import { Injectable } from "@angular/core";
import { PcNode } from "../model/d3/pc-node";
import { RouterNode } from "../model/d3/router-node";
import { SwitchNode } from "../model/d3/switch-node";
import { Simulation } from "../model/dto/simulation";
import { Pc } from "../model/dto/pc";
import { Switch } from "../model/dto/switch";
import { Router } from "../model/dto/router";
import { Link } from "../model/d3/link";
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
      pcNode.hostIdentity = element.hostIdentity;
      pcNodes.push(pcNode);
    });

    return pcNodes;
  }

  private getRouterNodes(routers: Router[]): RouterNode[] {
    let routerNodes: RouterNode[] = [];
    routers.forEach(element => {
      let router = new RouterNode(element.nodeNumber, element.routerNumber);
      router.databaseId = element.id;
      router.hostIdentity = element.hostIdentity;
      routerNodes.push(router);
    });

    return routerNodes;
  }

  private getSwitchesNodes(switches: Switch[]): SwitchNode[] {
    let switchesNodes: SwitchNode[] = [];
    switches.forEach(element => {
      let switchNode = new SwitchNode(element.nodeNumber, element.switchNumber);
      switchNode.databaseId = element.id;
      switchNode.hostIdentity = element.hostIdentity;
      switchesNodes.push(switchNode);
    });

    return switchesNodes;
  }
}
