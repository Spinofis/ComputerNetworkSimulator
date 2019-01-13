import { Node } from "./node";
import { NodeColor } from '../../enums/node-color';

export class PcNode extends Node {
  radius: number = 60;
  nodeColor = NodeColor.pc;

  constructor(id) {
    super(id);
  }

  public getColor() {
    return this.nodeColor;
  }

  public getSuffix() {
    return "PC_";
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
