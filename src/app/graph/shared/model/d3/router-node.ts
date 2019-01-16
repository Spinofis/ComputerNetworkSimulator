import { Node } from "./node";
import { NodeColor } from "../../enums/node-color";

export class RouterNode extends Node {
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
}
