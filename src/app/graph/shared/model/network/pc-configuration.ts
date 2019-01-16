import { HostConfiguration } from "../../abstract/host-configuration";

export class PcConfiguration extends HostConfiguration {
  public ip: string;
  public mask: string;
  public gateway: string;
}
