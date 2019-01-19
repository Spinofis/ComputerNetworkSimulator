import { Injectable } from "@angular/core";
import { PcNode } from "../model/d3/pc-node";
import { RouterNode } from "../model/d3/router-node";
import { PcConfiguratorComponent } from "../../pc-configurator/pc-configurator.component";
import { RouterConfiguratorComponent } from "../../router-configurator/router-configurator.component";
import { Node } from "../model/d3/node";
import { SimulationPathElement } from "../model/network/simulation-path-element";
import { Link } from "../model/d3/link";
import { DfsNode } from "../model/network/dfs-node";
import { path } from "d3";
import { SimulationPath } from "../model/network/simulation-path";

@Injectable()
export class NetworkService {
  private tempSimulationPaths: SimulationPath[];
  private simulationPath:SimulationPath;
  private visitedNodesIds: string[];

  public getHostConfiguratorWindow(node: Node) {
    if (node instanceof PcNode) {
      return PcConfiguratorComponent;
    } else if (node instanceof RouterNode) {
      return RouterConfiguratorComponent;
    }
  }

  public startSimulation(nodeStart: Node, nodeEnd: Node, nodes: Node[]) {
    if (!nodeStart || !nodeEnd || !nodes)
      throw new Error("Introduced parameters of simulation are invalid");

    let dfsNodes = this.nodeToDfsNode(nodes);
    let startDfsNode = dfsNodes.find(x => x.nodeId == nodeStart.id);
    let endDfsNode = dfsNodes.find(x => x.nodeId == nodeEnd.id);
    this.visitedNodesIds = [];
    let pathNodes: DfsNode[] = [];
    pathNodes.push(startDfsNode);
    this.dfs(startDfsNode, endDfsNode, dfsNodes, pathNodes);
    return path;
  }

  private dfs(
    startNode: DfsNode,
    endNode: DfsNode,
    dfsNodes: DfsNode[],
    pathNodes: DfsNode[]
  ) {
    if (startNode.nodeId == endNode.nodeId) {
      pathNodes.push(startNode);
      pathNodes.forEach(element => {
        console.log(element.nodeId);
      });
      return;
    }

    this.visitedNodesIds.push(startNode.nodeId);

    startNode.connectedNodesIds.forEach(element => {
      pathNodes.push(startNode);
      if (!this.visitedNodesIds.find(x => x == element)) {
        this.dfs(
          dfsNodes.find(x => x.nodeId == element),
          endNode,
          dfsNodes,
          pathNodes
        );
      }
      pathNodes.splice(pathNodes.indexOf(startNode), 1);
    });

    this.visitedNodesIds.splice(
      this.visitedNodesIds.indexOf(startNode.nodeId),
      1
    );
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
