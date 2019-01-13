import { Component, Input, EventEmitter, Output } from "@angular/core";
import { Node } from "../shared/model/d3/node";

@Component({
  selector: "[nodeVisual]",
  templateUrl: "./node-visual.component.html",
  styleUrls: ["./node-visual.component.scss"]
})
export class NodeVisualComponent {
  @Input("nodeVisual") node: Node;
  @Output("onNodeCliked")
  nodeClicked: EventEmitter<Node> = new EventEmitter<Node>();

  onNodeClicked() {
    // if (this.node.isSelected) this.node.deselectNode();
    // else this.node.selectNode();
    this.nodeClicked.emit(this.node);
  }

  get NodeId() {
    return this.node.id;
  }
}
