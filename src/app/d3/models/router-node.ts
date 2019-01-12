import { Node } from "./node";
import { NodeColors } from "src/app/shared/enums/node-color";

export class RouterNode extends Node {
  radius: number = 90;

  constructor(id) {
    super(id);
  }

  public getColor() {
    return NodeColors.router;
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
}
