import { RouterInterface } from "../network/router-interface";
import { RouterInterfaceDTO } from './router-interface';

export class Router {
  public id: number;
  public nodeNumber: string;
  public routerNumber: number;
  public name: string;
  public interfaces: RouterInterfaceDTO[];
}
