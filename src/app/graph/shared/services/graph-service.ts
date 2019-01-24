import { Injectable } from "@angular/core";
import { Link } from "../model/d3/link";
import { Node } from "../model/d3/node";
import { PcNode } from "../model/d3/pc-node";
import { RouterNode } from "../model/d3/router-node";
import { SwitchNode } from "../model/d3/switch-node";

@Injectable()
export class GraphService {
  public static nodeId: number = 1;
  public static pcId: number = 1;
  public static routerId: number = 1;
  public static switchId: number = 1;

  public deleteLink(node1: Node, node2: Node, links: Link[]) {
    if (!node1 || !node2) throw new Error("parameter node is null");

    let link = this.getLinkWithNodes(node1, node2, links);

    if (link) links.splice(links.indexOf(link), 1);
  }

  public addLink(node1: Node, node2: Node, links: Link[]) {
    if (!node1 || !node2) throw new Error("parameter node is null");

    if (!this.isAllowedToConnectNodes(node1, node2, links)) return;

    if (node1.id != node2.id) links.push(new Link(node1.id, node2.id));
  }

  private isAllowedToConnectNodes(node1: Node, node2: Node, links): boolean {
    let link = this.getLinkWithNodes(node1, node2, links);

    if (link) return false;

    if (
      node1.constructor.name == node2.constructor.name &&
      !(node1 instanceof RouterNode)
    )
      return false;

    if (node1 instanceof RouterNode && node2 instanceof PcNode) return false;

    if (node1 instanceof PcNode && node2 instanceof RouterNode) return false;

    if (node1 instanceof RouterNode && node2 instanceof SwitchNode) {
      if (this.hasRouterSwitch(node1, links)) return false;
      if (this.hasSwitchRouter(node2, links)) return false;
    }

    if (node1 instanceof SwitchNode && node2 instanceof RouterNode) {
      if (this.hasRouterSwitch(node2, links)) return false;
      if (this.hasSwitchRouter(node1, links)) return false;
    }

    return true;
  }

  private hasRouterSwitch(routerNode: Node, links: Link[]): boolean {
    let has: boolean = false;

    links.forEach(element => {
      if (element.source == routerNode && element.target instanceof SwitchNode)
        has = true;
      if (element.target == routerNode && element.source instanceof SwitchNode)
        has = true;
    });

    return has;
  }

  private hasSwitchRouter(switchNode: Node, links: Link[]): boolean {
    let has: boolean = false;

    links.forEach(element => {
      if (element.source == switchNode && element.target instanceof RouterNode)
        has = true;
      if (element.target == switchNode && element.source instanceof RouterNode)
        has = true;
    });

    return has;
  }

  public deleteNode(node: Node, links: Link[], nodes: Node[]) {
    if (!node) throw new Error("parameter node is null");

    let linksWithNode: Link[] = this.getAllLinksWithNode(node, links);

    linksWithNode.forEach(element => {
      links.splice(links.indexOf(element), 1);
    });

    nodes.splice(nodes.indexOf(node), 1);
  }

  private getLinkWithNodes(node1: Node, node2: Node, links: Link[]) {
    let link: Link = null;

    links.forEach(element => {
      if (
        (element.source as Node).id == node1.id &&
        (element.target as Node).id == node2.id
      )
        link = element;
    });

    links.forEach(element => {
      if (
        (element.source as Node).id == node2.id &&
        (element.target as Node).id == node1.id
      )
        link = element;
    });

    return link;
  }

  private getAllLinksWithNode(node: Node, links: Link[]) {
    let linksWithNode: Link[] = [];

    links.forEach(element => {
      if (
        (element.source as Node).id == node.id ||
        (element.target as Node).id == node.id
      )
        linksWithNode.push(element);
    });

    return linksWithNode;
  }

  public getRouterCountFromNode(nodes: Node[]): number {
    let routerNodes: number = 0;
    nodes.forEach(element => {
      if (element instanceof RouterNode) {
        routerNodes++;
      }
    });
    return routerNodes;
  }

  public getPcCountFromNodes(nodes: Node[]): number {
    let pcNodes: number = 0;
    nodes.forEach(element => {
      if (element instanceof PcNode) {
        pcNodes++;
      }
    });
    return pcNodes;
  }

  public getConnectedNodes(node: Node, nodes: Node[], links: Link[]): Node[] {
    let linksWithNode: Link[] = this.getAllLinksWithNode(node, links);
    let connectedNodes: Node[] = [];
    linksWithNode.forEach(element => {
      if (element.source != node) connectedNodes.push(element.source as Node);
      else connectedNodes.push(element.target as Node);
    });

    return connectedNodes;
  }

  public getNodeWithId(node: Node, nodes: Node[]) {
    nodes.forEach(element => {
      if (element.id == node.id) return element;
    });
    return null;
  }

  public setConnectedNodesForAllNodes(nodes: Node[], links: Link[]) {
    nodes.forEach(element => {
      element.connectedNodes = this.getConnectedNodes(element, nodes, links);
    });
  }

  public getPcNodesFormNodes(nodes: Node[]): PcNode[] {
    let pcNodes: PcNode[] = [];
    nodes.forEach(element => {
      if (element instanceof PcNode) pcNodes.push(element);
    });
    return pcNodes;
  }

  public addPcNode(graph, nodes): Node[] {
    graph.simulation.stop();
    if (!nodes) nodes = [];
    let newNodes: Node[] = [];
    nodes.forEach(element => {
      newNodes.push(element);
    });
    newNodes.push(new PcNode(GraphService.nodeId++, GraphService.pcId++));
    return newNodes;
  }

  public addRouterNode(graph, nodes): Node[] {
    graph.simulation.stop();
    if (!nodes) nodes = [];
    let newNodes: Node[] = [];
    nodes.forEach(element => {
      newNodes.push(element);
    });
    newNodes.push(
      new RouterNode(GraphService.nodeId++, GraphService.routerId++)
    );
    return newNodes;
  }

  public addSwitchNode(graph, nodes): Node[] {
    graph.simulation.stop();
    if (!nodes) nodes = [];
    let newNodes: Node[] = [];
    nodes.forEach(element => {
      newNodes.push(element);
    });
    newNodes.push(
      new SwitchNode(GraphService.nodeId++, GraphService.switchId++)
    );
    return newNodes;
  }

  public static updateIds(nodes: Node[]) {
    GraphService.nodeId = nodes.length + 1;

    nodes.forEach(element => {
      if (element instanceof PcNode) GraphService.pcId++;
    });

    nodes.forEach(element => {
      if (element instanceof RouterNode) GraphService.routerId++;
    });

    nodes.forEach(element => {
      if (element instanceof SwitchNode) GraphService.switchId++;
    });
  }

  public static resetIds() {
    GraphService.nodeId = 1;
    GraphService.pcId = 1;
    GraphService.routerId = 1;
    GraphService.switchId = 1;
  }
}
