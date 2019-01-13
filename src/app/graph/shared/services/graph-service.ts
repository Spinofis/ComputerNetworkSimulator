import { Injectable } from "@angular/core";
import { Link } from "../model/d3/link";
import { Node } from "../model/d3/node";

@Injectable()
export class GraphService {
  public removeLink(node1: Node, node2: Node, links: Link[]) {}
  public addLink(node1: Node, node2: Node, links: Link[]) {}
  public removeNode(node: Node, links: Link[], nodes: Node[]) {}
  public addNode(node: Node, nodes: Node) {}
}
