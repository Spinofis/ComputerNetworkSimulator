import { PcNode } from "../model/d3/pc-node";
import { Pc } from "../model/dto/pc";
import { Router } from "../model/dto/router";
import { RouterNode } from "../model/d3/router-node";
import { RouterInterfaceDTO } from "../model/dto/router-interface";
import { Node } from "../model/d3/node";
import { RouterConfiguration } from "../model/network/router-configuration";
import { Switch } from "../model/dto/switch";
import { SwitchNode } from "../model/d3/switch-node";
import { PcSwitch } from "../model/dto/pc-switch";
import { RouterSwitch } from "../model/dto/router-switch";
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
          ip: pcNode.pcConfiguration ? pcNode.pcConfiguration.ip : "",
          mask: pcNode.pcConfiguration ? pcNode.pcConfiguration.mask : "",
          gateway: pcNode.pcConfiguration ? pcNode.pcConfiguration.gateway : ""
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
          interfaces: this.getRouterInterfaces(routerNode.routerConfiguration)
        });
      }
    });

    return routers;
  }

  public getRouterInterfaces(
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
        mask: element.mask,
        connectedNodeNumber: element.nodeConnectedToId
      });
    });

    return interfacesDTO;
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
          switchNumber: switchNode.switchNumber
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

  // public getPcSwitches(pcs: Pc[], switches: Switch[], link: Link[]) {
  //   let pcSwitch: PcSwitch[] = [];

  //   link.forEach(element => {
  //     if (
  //       element.source instanceof SwitchNode &&
  //       element.target instanceof PcNode
  //     ) {
  //       let switchh = switches.find(
  //         x => x.nodeNumber == (element.source as SwitchNode).id
  //       );
  //       let pc = pcs.find(x => x.nodeNumber == (element.target as PcNode).id);
  //       pcSwitch.push({
  //         pc: pc,
  //         switch: switchh
  //       });
  //     }

  //     if (
  //       element.source instanceof PcNode &&
  //       element.target instanceof SwitchNode
  //     ) {
  //       let pc = pcs.find(x => x.nodeNumber == (element.source as PcNode).id);
  //       let switchh = switches.find(
  //         x => x.nodeNumber == (element.target as SwitchNode).id
  //       );

  //       pcSwitch.push({
  //         pc: pc,
  //         switch: switchh
  //       });
  //     }
  //   });

  //   return pcSwitch;
  // }

  // public getRouterSwitch(
  //   routers: Router[],
  //   switches: Switch[],
  //   link: Link[]
  // ): RouterSwitch[] {
  //   let routerSwitch: RouterSwitch[] = [];

  //   link.forEach(element => {
  //     if (
  //       element.source instanceof SwitchNode &&
  //       element.target instanceof RouterNode
  //     ) {
  //       let switchh = switches.find(
  //         x => x.nodeNumber == (element.source as SwitchNode).id
  //       );
  //       let router = routers.find(
  //         x => x.nodeNumber == (element.target as RouterNode).id
  //       );
  //       routerSwitch.push({
  //         router: router,
  //         switch: switchh
  //       });
  //     }

  //     if (
  //       element.source instanceof RouterNode &&
  //       element.target instanceof SwitchNode
  //     ) {
  //       let router = routers.find(
  //         x => x.nodeNumber == (element.source as RouterNode).id
  //       );
  //       let switchh = switches.find(
  //         x => x.nodeNumber == (element.target as SwitchNode).id
  //       );

  //       routerSwitch.push({
  //         router: router,
  //         switch: switchh
  //       });
  //     }
  //   });

  //   return routerSwitch;
  // }
}
