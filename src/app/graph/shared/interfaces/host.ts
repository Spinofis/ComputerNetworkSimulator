import { HostConfiguration } from "../abstract/host-configuration";

export interface Host {
  setConfiguration(config: HostConfiguration);
  getConfiguration(): HostConfiguration;
}
