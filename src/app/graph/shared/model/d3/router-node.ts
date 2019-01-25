import { Node } from "./node";
import { NodeColor } from "../../enums/node-color";
import { RouterConfiguration } from "../network/router-configuration";
import { HostConfiguration } from "../../abstract/host-configuration";
import { NodeSimulationState } from "../../enums/node-simulation-state";

export class RouterNode extends Node {
  public routerConfiguration: RouterConfiguration;
  public routerNumber: number;
  radius: number = 90;
  nodeColor = NodeColor.router;


  constructor(id,routerNumber) {
    super(id);
    this.routerNumber = routerNumber;
  }

  public getColor() {
    return this.nodeColor;
  }

  public getName() {
    return "Router_" + this.routerNumber;
    // return this.id;
  }

  public getR() {
    return this.radius;
  }

  public getFontSize() {
    return this.radius / 2 + "px";
  }

  public setNoneSimulationSate() {
    this.nodeSimulationState = NodeSimulationState.none;
    this.setBaseView();
  }

  public setBaseView() {
    this.isSelected = false;
    switch (this.nodeSimulationState) {
      case NodeSimulationState.correct: {
        this.nodeColor = NodeColor.correct;
        break;
      }
      case NodeSimulationState.invalid: {
        this.nodeColor = NodeColor.invalid;
        break;
      }
      case NodeSimulationState.none: {
        this.nodeColor = NodeColor.router;
        break;
      }
      default: {
        break;
      }
    }
  }

  public setConfiguration(config: HostConfiguration) {
    this.routerConfiguration = config as RouterConfiguration;
  }

  public getConfiguration() {
    return this.routerConfiguration;
  }

  public setConnectedNodes(connectedNodes: Node[]) {
    this.connectedNodes = connectedNodes;
  }

  public getConnectedNodes(): Node[] {
    return this.connectedNodes;
  }
}
