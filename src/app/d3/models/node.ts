import { NodeType } from 'src/app/shared/enums/node-type';

export class Node implements d3.SimulationNodeDatum {
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  nodeType: NodeType;

  id: string;
  linkCount: number = 0;

  constructor(id, nodeType: NodeType) {
    this.id = id;
    this.nodeType = nodeType;
  }

  // normal = () => {
  //   return Math.sqrt(this.linkCount / APP_CONFIG.N);
  // };

  // get r() {
  //   return 50 * this.normal() + 10;
  // }

  // get fontSize() {
  //   return 30 * this.normal() + 10 + "px";
  // }

  // get color() {
  //   let index = Math.floor(APP_CONFIG.SPECTRUM.length * this.normal());
  //   return APP_CONFIG.SPECTRUM[index];
  // }
}
