import { Node } from "./node";
import { NodeColor } from "../../enums/node-color";
import { PcConfiguration } from "../network/pc-configuration";
import { Host } from "../../interfaces/host";
import { HostConfiguration } from "../../abstract/host-configuration";
import { NodeSimulationState } from "../../enums/node-simulation-state";

export class PcNode extends Node implements Host {
  public pcConfiguration: PcConfiguration;
  private pcNumber: number;
  radius: number = 60;
  nodeColor = NodeColor.pc;

  constructor(id, pcNumber) {
    super(id);
    this.pcNumber = pcNumber;
  }

  public getColor() {
    return this.nodeColor;
  }

  public getName() {
    return this.id;
  }

  public getR() {
    return this.radius;
  }

  public getFontSize() {
    return this.radius / 2 + "px";
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
        this.nodeColor = NodeColor.pc;
        break;
      }
      default: {
        break;
      }
    }
  }

  public setNoneSimulationSate() {
    this.nodeSimulationState = NodeSimulationState.none;
    this.setBaseView();
  }

  public setConfiguration(config: HostConfiguration) {
    this.pcConfiguration = config as PcConfiguration;
  }

  public getConfiguration() {
    return this.pcConfiguration;
  }
}
