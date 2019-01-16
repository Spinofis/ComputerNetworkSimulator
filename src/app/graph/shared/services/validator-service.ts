import { Injectable } from "@angular/core";

@Injectable()
export class ValidatorService {
  private ipPattern: string =
    "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";

  public getIpPattern(): string {
    return this.ipPattern;
  }

  public isIpValid(value: string): boolean {
    let regex = new RegExp(this.ipPattern);
    return regex.test(value);
  }
}
