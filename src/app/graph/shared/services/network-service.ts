import { Injectable } from "@angular/core";
import { PcNode } from "../model/d3/pc-node";
import { RouterNode } from "../model/d3/router-node";
import { PcConfiguratorComponent } from "../../pc-configurator/pc-configurator.component";
import { RouterConfiguratorComponent } from "../../router-configurator/router-configurator.component";
import { Node } from "../model/d3/node";

@Injectable()
export class NetworkService {
  public getHostConfiguratorWindow(node: Node) {
    if (node instanceof PcNode) {
      return PcConfiguratorComponent;
    } else if (node instanceof RouterNode) {
      return RouterConfiguratorComponent;
    }
  }
}
