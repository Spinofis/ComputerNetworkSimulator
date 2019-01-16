import { Injectable } from "@angular/core";

@Injectable()
export class ValidatorService {
  public getIpPattern() {
    return "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
  }
}
