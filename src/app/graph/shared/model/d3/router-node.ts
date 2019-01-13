import { Node } from "./node";
import { NodeColor } from '../../enums/node-color';

export class RouterNode extends Node {
  radius: number = 90;
  nodeColor = NodeColor.router;

  constructor(id) {
    super(id);
  }

  public getColor() {
    return this.nodeColor;
  }

  public getSuffix() {
    return "Router_";
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
}
