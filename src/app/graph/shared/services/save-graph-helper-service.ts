import { PcNode } from "../model/d3/pc-node";
import { Pc } from "../model/dto/pc";
import { Router } from "../model/dto/router";
import { RouterNode } from "../model/d3/router-node";
import { Node } from "../model/d3/node";
import { Switch } from "../model/dto/switch";
import { SwitchNode } from "../model/d3/switch-node";
import { Link } from "../model/d3/link";
import { LinkDto } from "../model/dto/link";

export class SaveGrapHelperService {
  public getPcs(nodes: Node[]): Pc[] {
    let pcs: Pc[] = [];

    nodes.forEach(node => {
      if (node instanceof PcNode) {
        let pcNode = node as PcNode;
        pcs.push({
          id: pcNode.databaseId,
          name: pcNode.getName(),
          pcNumber: pcNode.pcNumber,
          nodeNumber: pcNode.id,
          hostIdentity: pcNode.hostIdentity
        });
      }
    });

    return pcs;
  }

  public getRouters(nodes: Node[]) {
    let routers: Router[] = [];

    nodes.forEach(node => {
      if (node instanceof RouterNode) {
        let routerNode = node as RouterNode;
        routers.push({
          id: routerNode.databaseId,
          name: routerNode.getName(),
          nodeNumber: routerNode.id,
          routerNumber: routerNode.routerNumber,
          hostIdentity: routerNode.hostIdentity
        });
      }
    });

    return routers;
  }

  public getSwitches(nodes: Node[]): Switch[] {
    let switches: Switch[] = [];

    nodes.forEach(node => {
      if (node instanceof SwitchNode) {
        let switchNode = node as SwitchNode;
        switches.push({
          id: switchNode.databaseId,
          name: switchNode.getName(),
          nodeNumber: switchNode.id,
          switchNumber: switchNode.switchNumber,
          hostIdentity: switchNode.hostIdentity
        });
      }
    });

    return switches;
  }

  public getLinks(links: Link[]): LinkDto[] {
    let linksDto: LinkDto[] = [];
    links.forEach(element => {
      linksDto.push({
        nodeNumber1: (element.source as Node).id,
        nodeNumber2: (element.target as Node).id
      });
    });

    return linksDto;
  }
}
