import { NodeColor } from '../../enums/node-color';

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
  nodeColor: NodeColor;
  isSelected: boolean = false;

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

  public getName() {
    alert("method should be overriden");
  }

  public selectNode() {
    this.isSelected = true;
    this.nodeColor = NodeColor.selectedNode;
  }

  public deselectNode() {
    alert("method should be overriden");
  }
}
