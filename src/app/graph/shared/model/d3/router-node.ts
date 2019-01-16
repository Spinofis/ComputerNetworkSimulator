import { Node } from "./node";
import { NodeColor } from "../../enums/node-color";
import { RouterConfiguration } from "../network/router-configuration";
import { HostConfiguration } from "../../abstract/host-configuration";

export class RouterNode extends Node {
  public routerConfiguration: RouterConfiguration;
  private routerNumber: number;
  radius: number = 90;
  nodeColor = NodeColor.router;

  private static routerNumber = 1;

  constructor(id) {
    super(id);
    this.routerNumber = RouterNode.routerNumber++;
  }

  public getColor() {
    return this.nodeColor;
  }

  public getName() {
    return "Router_" + this.routerNumber;
  }

  public getR() {
    return this.radius;
  }

  public getFontSize() {
    return this.radius / 2 + "px";
  }

  public deselectNode() {
    this.isSelected = false;
    this.nodeColor = NodeColor.router;
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
