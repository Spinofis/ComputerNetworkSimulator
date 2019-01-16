import { Component, OnInit } from "@angular/core";
import { HostConfigurator } from "../shared/interfaces/host-configurator";
import { Node } from "../shared/model/d3/node";
import { RouterNode } from "../shared/model/d3/router-node";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { RouterInterface } from "../shared/model/network/router-interface";
import { RouterConfiguration } from "../shared/model/network/router-configuration";
import { ValidatorService } from "../shared/services/validator-service";
import { nodeChildrenAsMap } from "@angular/router/src/utils/tree";

@Component({
  selector: "app-router-configurator",
  templateUrl: "./router-configurator.component.html",
  styleUrls: ["./router-configurator.component.scss"]
})
export class RouterConfiguratorComponent implements OnInit, HostConfigurator {
  routerNode: RouterNode;
  gridDataSource: any[] = [];
  node: Node;

  columnDefs = [
    { headerName: "Interfejs", field: "interface" },
    { headerName: "Ip", field: "ip", editable: true },
    { headerName: "Maska", field: "mask", editable: true },
    { headerName: "Id hosta", field: "hostId" }
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private validatorService: ValidatorService
  ) {}

  ngOnInit() {}

  public setNode(node: Node) {
    this.node = node;
    this.gridDataSource = [];
    this.prepareGridDataSource(node);
  }

  btnCancel_Click() {
    this.activeModal.close();
  }

  btnSave_Click() {
    if (!this.isDataValid()) {
      alert("Wprowadzone ip zawierają niepoprawne dane");
    } else {
      let routerConfiguration: RouterConfiguration = new RouterConfiguration();
      routerConfiguration.interfaces = [];
      this.gridDataSource.forEach(element => {
        routerConfiguration.interfaces.push({
          connectionName: element.interface,
          ip: element.ip,
          mask: element.mask,
          nodeConnectedToId: element.hostId
        });
      });
      this.node.setConfiguration(routerConfiguration);
      this.activeModal.close();
    }
  }

  private isDataValid(): boolean {
    let isValid: boolean = true;
    this.gridDataSource.forEach(element => {
      if (!this.validatorService.isIpValid(element.ip)) isValid = false;
      if (!this.validatorService.isIpValid(element.mask)) isValid = false;
    });

    return isValid;
  }

  private prepareGridDataSource(node: Node) {
    let routerConfiguration: RouterConfiguration = node.getConfiguration();
    if (routerConfiguration) {
      routerConfiguration.interfaces.forEach(element => {
        this.gridDataSource.push({
          hostId: element.nodeConnectedToId,
          interface: element.connectionName,
          ip: element.ip,
          mask: element.mask
        });
      });
    }
    node.connectedNodes.forEach(element => {
      if (!this.gridDataSource.find(x => x.hostId == element.id))
        this.gridDataSource.push({
          hostId: element.id,
          interface: node.getName() + " / " + element.getName(),
          ip: "",
          mask: ""
        });
    });
  }
}