import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { GraphEditMode } from "../shared/enums/graph-edit-mode";

@Component({
  selector: "app-graph-menu",
  templateUrl: "./graph-menu.component.html",
  styleUrls: ["./graph-menu.component.scss"]
})
export class GraphMenu implements OnInit {
  isDeleatingDevices: boolean = false;
  isDeleatingLinks: boolean = false;
  isAddingLinks: boolean = false;

  @Output() graphEditModeChange: EventEmitter<GraphEditMode> = new EventEmitter<
    GraphEditMode
  >();
  @Output() addPc: EventEmitter<string> = new EventEmitter<string>();
  @Output() addRouter: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  cbDeleteDevices_Click() {
    this.isDeleatingDevices = !this.isDeleatingDevices;
    if (this.isDeleatingDevices) {
      this.isDeleatingLinks = this.isAddingLinks = false;
      this.graphEditModeChange.emit(GraphEditMode.deleteNodes);
    } else {
      this.graphEditModeChange.emit(GraphEditMode.none);
    }
  }

  cbAddLinks_Click() {
    this.isAddingLinks = !this.isAddingLinks;
    if (this.isAddingLinks) {
      this.isDeleatingLinks = this.isDeleatingDevices = false;
      this.graphEditModeChange.emit(GraphEditMode.addLinks);
    } else {
      this.graphEditModeChange.emit(GraphEditMode.none);
    }
  }

  cbDeleatingLinks_Click() {
    this.isDeleatingLinks = !this.isDeleatingLinks;
    if (this.isDeleatingLinks) {
      this.isAddingLinks = this.isDeleatingDevices = false;
      this.graphEditModeChange.emit(GraphEditMode.deleteLinks);
    } else {
      this.graphEditModeChange.emit(GraphEditMode.none);
    }
  }

  addRouter_Click() {
    this.addRouter.emit("add router");
  }

  addPc_Click() {
    this.addPc.emit("add pc");
  }
}
