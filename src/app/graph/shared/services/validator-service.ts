import { Injectable } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { Node } from "../model/d3/node";
import { PcConfiguration } from "../model/network/pc-configuration";
import { RouterConfiguration } from "../model/network/router-configuration";
import { Netmask } from "netmask";
import { RouterNode } from "../model/d3/router-node";
import { SwitchNode } from "../model/d3/switch-node";
import { RouterInterface } from "../model/network/router-interface";
import { PcNode } from "../model/d3/pc-node";

@Injectable()
export class ValidatorService {
  private hostIps: string[] = [];
  private netIps: string[] = [];
  private errors: string[] = [];

  private ipPattern: string =
    "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";

  private netIpWithMaskPattern: string =
    "^([0-9]{1,3}.){3}[0-9]{1,3}(/([0-9]|[1-2][0-9]|3[0-2]))?$";

  public getIpPattern(): string {
    return this.ipPattern;
  }

  public getIpWithMasPattern() {
    return this.netIpWithMaskPattern;
  }

  isIpWithMaskValid(value: string) {
    let regex = new RegExp(this.netIpWithMaskPattern);
    return regex.test(value);
  }

  public isIpValid(value: string): boolean {
    let regex = new RegExp(this.ipPattern);
    return regex.test(value);
  }

  public hasControlErrors(formGroup: FormGroup): boolean {
    let errors: boolean = false;
    Object.keys(formGroup.controls).forEach(key => {
      let abstractControl: AbstractControl = formGroup.get(key);
      abstractControl.markAsDirty();
      if (abstractControl.invalid) errors = true;
    });
    return errors;
  }

  public validateSimulation(nodes: Node[]): string[] {
    this.prepareToValidate(nodes);
    this.validateForDuplicateIp();
    this.checkForIpRanges();
    this.vadildateRouters(nodes);
    return this.errors;
  }

  private checkForIpRanges() {
    var i = 0;
    this.hostIps.forEach(hostIp => {
      i = 0;
      this.netIps.forEach(netIp => {
        const net = new Netmask(netIp);
        if (net.contains(hostIp)) i++;
        // if (i == 2)
        //   this.errors.push(hostIp + " należy do więcej niż jednej sieci.");
      });
      if (i == 0) this.errors.push(hostIp + " nie należy do żadnej sieci.");
    });
  }

  private isIpBelongToNet(ip: string, netIp: string): boolean {
    const net = new Netmask(netIp);
    if (net.contains(ip)) return true;
    else return false;
  }

  private validateForDuplicateIp() {
    var i = 0;
    this.hostIps.forEach(ip1 => {
      i = 0;
      this.hostIps.forEach(ip2 => {
        if (ip1 == ip2) i++;
        if (i == 2) {
          this.errors.push(ip1 + " występuje więcej niż raz.");
          i = 0;
        }
      });
    });
  }

  private prepareToValidate(nodes: Node[]) {
    this.hostIps = [];
    this.netIps = [];
    this.errors = [];
    this.setIpTables(nodes);
  }

  private setIpTables(node: Node[]) {
    node.forEach(element => {
      var config = element.getConfiguration();
      if (config) {
        if (element instanceof PcNode) {
          this.setHostsIpsFromPc(config as PcConfiguration);
        }
        if (config instanceof RouterConfiguration) {
          this.setHostsIpsFromRouter(config);
          this.setNetIpFromRouter(config);
        }
      }
    });
  }

  private setNetIpFromRouter(routerConfiguration: RouterConfiguration) {
    if (routerConfiguration.interfaces) {
      routerConfiguration.interfaces.forEach(element => {
        this.netIps.push(element.networkIp);
      });
    }
  }

  private setHostsIpsFromPc(pcConfiguration: PcConfiguration) {
    this.hostIps.push(pcConfiguration.ip);
  }

  private setHostsIpsFromRouter(routerConfiguration: RouterConfiguration) {
    if (routerConfiguration.interfaces) {
      routerConfiguration.interfaces.forEach(element => {
        this.hostIps.push(element.ip);
      });
    }
  }

  private getRouters(nodes: Node[]) {
    let routers: RouterNode[] = [];
    nodes.forEach(element => {
      if (element instanceof RouterNode) {
        routers.push(element);
      }
    });
    return routers;
  }

  private getPcs(nodes: Node[]) {
    let routers: PcNode[] = [];
    nodes.forEach(element => {
      if (element instanceof PcNode) {
        routers.push(element);
      }
    });
    return routers;
  }

  private vadildateRouters(nodes: Node[]) {
    var routers = this.getRouters(nodes);
    routers.forEach(router => {
      router.connectedNodes.forEach(connectedNode => {
        if (connectedNode instanceof SwitchNode) {
          this.validateLocalSubnet(connectedNode, router);
        } else if (connectedNode instanceof RouterNode) {
          this.validateGloabalSubnet(router, connectedNode);
        }
      });
    });
  }

  private validateGloabalSubnet(
    router: RouterNode,
    connectedRouter: RouterNode
  ) {
    let routerInterface2: RouterInterface;
    let routerInterface1: RouterInterface;

    var configuration1 = router.getConfiguration();
    if (configuration1 && configuration1.interfaces) {
      routerInterface1 = configuration1.interfaces.find(
        x => x.nodeConnectedToId == connectedRouter.id
      );
    }

    var configuration2 = connectedRouter.getConfiguration();
    if (configuration2 && configuration2.interfaces) {
      routerInterface2 = configuration2.interfaces.find(
        x => x.nodeConnectedToId == router.id
      );
    }

    if (!routerInterface1 || !routerInterface2) {
      if (routerInterface1.networkIp != routerInterface2.networkIp) {
        this.errors.push(
          "Błąd w połączeiu " +
            router.getName() +
            " i " +
            connectedRouter.getName()
        );
      }

      // if (
      //   !this.isIpBelongToNet(routerInterface1.ip, routerInterface1.networkIp)
      // ) {
      //   this.errors.push(
      //     routerInterface1.ip +
      //       " nie należy do sieci " +
      //       routerInterface1.networkIp
      //   );
      // }

      // if (
      //   !this.isIpBelongToNet(routerInterface2.ip, routerInterface2.networkIp)
      // ) {
      //   this.errors.push(
      //     routerInterface2.ip +
      //       " nie należy do sieci " +
      //       routerInterface2.networkIp
      //   );
      // }
    }
  }

  private validateLocalSubnet(switchNode: SwitchNode, router: RouterNode) {
    var configuration = router.getConfiguration();
    if (configuration && configuration.interfaces) {
      let routerInterface: RouterInterface = configuration.interfaces.find(
        x => x.nodeConnectedToId == switchNode.id
      );

      if (
        !this.isIpBelongToNet(routerInterface.ip, routerInterface.networkIp)
      ) {
        this.errors.push(
          routerInterface.ip +
            " nie należy do sieci " +
            routerInterface.networkIp
        );
      }

      if (switchNode.connectedNodes) {
        switchNode.connectedNodes.forEach(element => {
          if (element instanceof PcNode) {
            var pcConfig = element.getConfiguration();
            if (pcConfig) {
              if (pcConfig.gateway != routerInterface.ip) {
                this.errors.push(
                  "Brama " + pcConfig.gateway + " nie jest zgodna z routerem."
                );
              }
              if (
                !this.isIpBelongToNet(pcConfig.ip, routerInterface.networkIp)
              ) {
                this.errors.push(
                  "Ip " +
                    pcConfig.ip +
                    " nie należy do sieci " +
                    routerInterface.networkIp
                );
              }
            }
          }
        });
      }
    }
  }
}
