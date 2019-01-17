import { Injectable } from "@angular/core";
import { PcNode } from "../model/d3/pc-node";
import { RouterNode } from "../model/d3/router-node";
import { PcConfiguratorComponent } from "../../pc-configurator/pc-configurator.component";
import { RouterConfiguratorComponent } from "../../router-configurator/router-configurator.component";
import { Node } from "../model/d3/node";
import { PathElement } from "../model/network/path-element";
import { Link } from "../model/d3/link";
import { DfsNode } from "../model/network/dfs-node";
import { path } from "d3";

@Injectable()
export class NetworkService {
  path: PathElement[] = [];

  public getHostConfiguratorWindow(node: Node) {
    if (node instanceof PcNode) {
      return PcConfiguratorComponent;
    } else if (node instanceof RouterNode) {
      return RouterConfiguratorComponent;
    }
  }

  public startSimulation(node: Node, nodes: Node[]) {
    let dfsNodes = this.nodeToDfsNode(nodes);
    let startDfsNode = dfsNodes.find(x => x.nodeId == node.id);
    this.dfs(startDfsNode, dfsNodes);
    return path;
  }

  private dfs(startNode: DfsNode, dfsNodes: DfsNode[]) {
    if (startNode.isVisted) {
      return;
    } else {
      startNode.isVisted = true;
      this.path.push({
        nodeId: startNode.nodeId,
        order: null
      });
      startNode.connectedNodesIds.forEach(element => {
        this.dfs(dfsNodes.find(x => x.nodeId == element), dfsNodes);
      });
    }
  }

  private nodeToDfsNode(nodes: Node[]) {
    let dfsNodes: DfsNode[] = [];
    nodes.forEach(element => {
      dfsNodes.push({
        nodeId: element.id,
        connectedNodesIds: this.getConnectedNodesIds(element.connectedNodes),
        isVisted: false
      });
    });

    return dfsNodes;
  }

  private getConnectedNodesIds(nodes: Node[]) {
    let iDs: string[] = [];
    nodes.forEach(element => {
      iDs.push(element.id);
    });
    return iDs;
  }
}
