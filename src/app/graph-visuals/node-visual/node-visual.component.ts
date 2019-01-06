import { Component, Input, OnInit } from "@angular/core";
import { Node } from "../../d3";
import { NodeType } from "src/app/shared/enums/node-type";
import { Icons } from "src/app/shared/enums/icon-uri";

@Component({
  selector: "[nodeVisual]",
  templateUrl: "./node-visual.component.html",
  styleUrls: ["./node-visual.component.scss"]
})
export class NodeVisualComponent implements OnInit {
  @Input("nodeVisual") node: Node;
  nodeImageUri: string = "";

  ngOnInit() {
    if (this.node.nodeType == NodeType.Pc) this.nodeImageUri = Icons.pc;
    else if (this.node.nodeType == NodeType.Router)
      this.nodeImageUri = Icons.router;
  }
}
