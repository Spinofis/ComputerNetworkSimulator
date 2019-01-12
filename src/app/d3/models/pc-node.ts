import { Node } from "./node";
import { NodeColors } from "src/app/shared/enums/node-color";

export class PcNode extends Node {
  radius: number = 60;

  constructor(id) {
    super(id);
  }

  public getColor() {
    return NodeColors.pc;
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
}
