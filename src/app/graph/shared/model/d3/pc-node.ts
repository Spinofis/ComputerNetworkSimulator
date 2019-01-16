import { Node } from "./node";
import { NodeColor } from "../../enums/node-color";

export class PcNode extends Node {
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
    return "PC_" + this.pcNumber;
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
}
