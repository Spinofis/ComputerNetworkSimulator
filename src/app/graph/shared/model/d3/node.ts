import { NodeColor } from "../../enums/node-color";
import { Host } from "../../interfaces/host";
import { HostConfiguration } from "../../abstract/host-configuration";
import { NodeSimulationState } from "../../enums/node-simulation-state";

export abstract class Node implements d3.SimulationNodeDatum, Host {
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: string;
  databaseId: number = 0;
  linkCount: number = 0;
  nodeColor: NodeColor;
  isSelected: boolean = false;
  nodeSimulationState: NodeSimulationState = NodeSimulationState.none;
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
    this.nodeColor = NodeColor.selected;
  }

  public setCorrect() {
    this.nodeSimulationState = NodeSimulationState.correct;
    this.nodeColor = NodeColor.correct;
  }

  public setInvalid() {
    this.nodeSimulationState = NodeSimulationState.invalid;
    this.nodeColor = NodeColor.invalid;
  }

  public setBaseView() {}

  public setNoneSimulationSate() {}

  public setConfiguration(config: HostConfiguration) {}

  public getConfiguration() {
    return null;
  }

  public setConnectedNodes(connectedNodes: Node[]) {}

  public getConnectedNodes(): Node[] {
    return this.connectedNodes;
  }
}
