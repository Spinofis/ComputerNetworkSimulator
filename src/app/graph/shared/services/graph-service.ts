import { Injectable } from "@angular/core";
import { Link } from "../model/d3/link";
import { Node } from "../model/d3/node";
import { isType } from "@angular/core/src/type";
import { PcNode } from "../model/d3/pc-node";
import { RouterNode } from "../model/d3/router-node";

@Injectable()
export class GraphService {
  private static nodeId: number = 1;

  public deleteLink(node1: Node, node2: Node, links: Link[]) {
    if (!node1 || !node2) throw new Error("parameter node is null");

    let link = this.getLinkWithNodes(node1, node2, links);

    if (link) links.splice(links.indexOf(link), 1);
  }

  public addLink(node1: Node, node2: Node, links: Link[]) {
    if (!node1 || !node2) throw new Error("parameter node is null");

    let link = this.getLinkWithNodes(node1, node2, links);

    if (link) return;

    if (node1.id != node2.id) links.push(new Link(node1.id, node2.id));
  }

  public deleteNode(node: Node, links: Link[], nodes: Node[]) {
    if (!node) throw new Error("parameter node is null");

    let linksWithNode: Link[] = this.getAllLinksWithNode(node, links);

    linksWithNode.forEach(element => {
      // let index: number = links.indexOf(element);
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
    newNodes.push(new PcNode(GraphService.nodeId++));
    return newNodes;
  }

  public addRouterNode(graph, nodes): Node[] {
    graph.simulation.stop();
    if (!nodes) nodes = [];
    let newNodes: Node[] = [];
    nodes.forEach(element => {
      newNodes.push(element);
    });
    newNodes.push(new RouterNode(GraphService.nodeId++));
    return newNodes;
  }
}
