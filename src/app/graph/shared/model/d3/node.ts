import { NodeColor } from "../../enums/node-color";
import { Host } from "../../interfaces/host";
import { HostConfiguration } from "../../abstract/host-configuration";

export abstract class Node implements d3.SimulationNodeDatum, Host {
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: string;
  linkCount: number = 0;
  nodeColor: NodeColor;
  isSelected: boolean = false;
  connectedNodes: Node[] = [];

  constructor(id) {
    this.id = id;
  }

  public getR() {}

  public getFontSize() {}

  public getColor() {}

  public getName() {}

  public selectNode() {
    this.isSelected = true;
    this.nodeColor = NodeColor.selectedNode;
  }

  public deselectNode() {}

  public setConfiguration(config: HostConfiguration) {}

  public getConfiguration() {
    return null;
  }

  public setConnectedNodes(connectedNodes: Node[]) {}

  public getConnectedNodes(): Node[] {
    return this.connectedNodes;
  }
}
