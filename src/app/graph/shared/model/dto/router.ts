import { RouterInterface } from "../network/router-interface";

export class Router {
  public id: number;
  public nodeNumber: number;
  public routerNumber: number;
  public name: string;
  public interfaces: RouterInterface[];
}
