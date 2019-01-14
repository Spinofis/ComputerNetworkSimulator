import { Component, ViewChild } from "@angular/core";
import { GraphComponent } from './graph/graph/graph.component';
import { Link } from './graph/shared/model/d3/link';
import { Node } from './graph/shared/model/d3/node';
import { PcNode } from './graph/shared/model/d3/pc-node';
import { RouterNode } from './graph/shared/model/d3/router-node';



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
    let node3: Node = new PcNode(2);
    this.nodes.push(node1);
    this.nodes.push(node2);
    this.nodes.push(node3);
    let link1 = new Link(0, 1);
    let link2 = new Link(2, 1);
    this.links.push(link1);
    this.links.push(link2);
  }
}
