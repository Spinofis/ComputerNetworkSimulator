import { Injectable } from "@angular/core";
import { Link } from "../model/d3/link";
import { Node } from "../model/d3/node";
import { GraphEditMode } from "../enums/graph-edit-mode";

@Injectable()
export class GraphService {
  public editGraph(
    clickedNode1: Node,
    clickedNode2: Node,
    editMode: GraphEditMode,
    nodes: Node[],
    links: Link[]
  ) {
    switch (editMode) {
      case GraphEditMode.addLinks: {
        this.addLink(clickedNode1, clickedNode2, links);
        break;
      }
      case GraphEditMode.deleteLinks: {
        this.deleteLink(clickedNode1, clickedNode2, links);
        break;
      }
      case GraphEditMode.deleteNodes: {
        this.deleteNode(clickedNode1, links, nodes);
        break;
      }
      case GraphEditMode.addNode: {
        this.addNode(clickedNode1, nodes);
        break;
      }
      default: {
        break;
      }
    }
  }

  private addNode(node: Node, nodes: Node[]) {}

  private deleteLink(node1: Node, node2: Node, links: Link[]) {
    if (!node1 || !node2) throw new Error("parameter node is null");

    let link = this.getLinkWithNodes(node1, node2, links);

    if (link) links.splice(links.indexOf(link), 1);
  }

  private addLink(node1: Node, node2: Node, links: Link[]) {
    if (!node1 || !node2) throw new Error("parameter node is null");

    let link = this.getLinkWithNodes(node1, node2, links);

    if (link) return;

    if (node1.id != node2.id) links.push(new Link(node1.id, node2.id));
  }

  private deleteNode(node: Node, links: Link[], nodes: Node[]) {}

  private getLinkWithNodes(node1: Node, node2: Node, links: Link[]) {
    let link: Link = null;

    links.forEach(element => {
      if (
        (element.source as Node).id == node1.id ||
        (element.target as Node).id == node2.id
      )
        link = element;
    });

    links.forEach(element => {
      if (
        (element.source as Node).id == node2.id ||
        (element.target as Node).id == node1.id
      )
        link = element;
    });

    return link;
  }
}
