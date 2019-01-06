import { Component } from "@angular/core";
import { Node, Link } from "./d3";
import { NodeType } from "./shared/enums/node-type";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  nodes: Node[] = [];
  links: Link[] = [];

  constructor() {
    this.nodes.push(new Node(0, NodeType.Pc));
    this.nodes.push(new Node(1, NodeType.Router));
    this.nodes.push(new Node(2, NodeType.Pc));

    this.links.push(new Link(0, 1));
    this.links.push(new Link(1, 2));

  }
}
