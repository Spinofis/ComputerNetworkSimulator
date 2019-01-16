import { RouterInterface } from "./router-interface";
import { HostConfiguration } from "../../abstract/host-configuration";

export class RouterConfiguration extends HostConfiguration {
  public interfaces: RouterInterface[];
}
