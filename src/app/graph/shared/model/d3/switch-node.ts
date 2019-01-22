import { Node } from "./node";
import { NodeColor } from "../../enums/node-color";
import { PcConfiguration } from "../network/pc-configuration";
import { Host } from "../../interfaces/host";
import { HostConfiguration } from "../../abstract/host-configuration";
import { NodeSimulationState } from "../../enums/node-simulation-state";

export class SwitchNode extends Node implements Host {
  public switchNumber: number;
  public radius: number = 75;
  nodeColor = NodeColor.switch;

  constructor(id, switchNumber) {
    super(id);
    this.switchNumber = switchNumber;
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
        this.nodeColor = NodeColor.switch;
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
    // this.pcConfiguration = config as PcConfiguration;
  }

  public getConfiguration() {
    return null;
  }
}
