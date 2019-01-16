import { Component, OnInit } from "@angular/core";
import { HostConfigurator } from "../shared/interfaces/host-configurator";
import { Node } from "../shared/model/d3/node";
import { RouterNode } from "../shared/model/d3/router-node";

@Component({
  selector: "app-router-configurator",
  templateUrl: "./router-configurator.component.html",
  styleUrls: ["./router-configurator.component.scss"]
})
export class RouterConfiguratorComponent implements OnInit, HostConfigurator {
  routerNode: RouterNode;
  constructor() {}

  ngOnInit() {}

  public setNode(node: Node) {}
}
