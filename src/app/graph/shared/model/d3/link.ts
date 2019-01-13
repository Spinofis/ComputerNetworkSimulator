import { Node } from "./node";

export class Link implements d3.SimulationLinkDatum<Node> {
  public source: Node | string | number;
  public target: Node | string | number;

  constructor(source, target) {
    this.source = source;
    this.target = target;
  }


}
