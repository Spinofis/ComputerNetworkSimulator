import { Node } from "./node";
import { NodeColor } from "../../enums/node-color";
import { PcConfiguration } from "../network/pc-configuration";
import { Host } from "../../interfaces/host";
import { HostConfiguration } from "../../abstract/host-configuration";

export class PcNode extends Node implements Host {
  public pcConfiguration: PcConfiguration;
  private pcNumber: number;
  radius: number = 60;
  nodeColor = NodeColor.pc;

  private static pcNumber = 1;

  constructor(id) {
    super(id);
    this.pcNumber = PcNode.pcNumber++;
  }

  public getColor() {
    return this.nodeColor;
  }

  public getName() {
    // return "PC_" + this.pcNumber;
    return this.id;
  }

  public getR() {
    return this.radius;
  }

  public getFontSize() {
    return this.radius / 2 + "px";
  }

  public deselectNode() {
    this.isSelected = false;
    this.nodeColor = NodeColor.pc;
  }

  public setConfiguration(config: HostConfiguration) {
    this.pcConfiguration = config as PcConfiguration;
  }

  public getConfiguration() {
    return this.pcConfiguration;
  }
}
