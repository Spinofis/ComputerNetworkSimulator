import APP_CONFIG from "../../app.config";
import { NodeType } from "src/app/shared/enums/node-type";
import { NodeColors } from "src/app/shared/enums/node-color";

export abstract class Node implements d3.SimulationNodeDatum {
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: string;
  linkCount: number = 0;

  constructor(id) {
    this.id = id;
  }

  public getR() {
    alert("method should be overriden");
  }

  public getFontSize() {
    alert("method should be overriden");
  }

  public getColor() {
    alert("method should be overriden");
  }

  public getSuffix() {
    alert("method should be overriden");
  }
}
