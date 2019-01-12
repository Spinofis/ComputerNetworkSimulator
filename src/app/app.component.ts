import { Component, ViewChild } from "@angular/core";
import { Node, Link } from "./d3";
import { NodeType } from "./shared/enums/node-type";
import { PcNode } from "./d3/models/pc-node";
import { RouterNode } from "./d3/models/router-node";
import { GraphComponent } from "./visuals/graph/graph.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild("graph")
  graph: GraphComponent;

  nodes: Node[] = [];
  links: Link[] = [];

  constructor() {
    let node1: Node = new PcNode(0);
    let node2: Node = new RouterNode(1);
    this.nodes.push(node1);
    this.nodes.push(node2);
    // this.links.push(new Link(0, 1));

    setTimeout(() => {
      this.links.push(new Link(0, 1));
      this.graph.recreateLinks();
    }, 3000);
  }
}
