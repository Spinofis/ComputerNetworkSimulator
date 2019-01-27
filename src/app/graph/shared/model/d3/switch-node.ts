import { Node } from "./node";
import { NodeColor } from "../../enums/node-color";
import { NodeSimulationState } from "../../enums/node-simulation-state";

export class SwitchNode extends Node   {
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
    return "Switch_" + this.switchNumber;
    // return this.id;
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
}
