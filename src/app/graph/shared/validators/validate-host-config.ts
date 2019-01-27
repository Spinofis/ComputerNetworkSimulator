import { AbstractControl } from "@angular/forms";

const ipPattern: string =
  "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";

const hostNamePattern: string = "^([A-Za-z0-9]+\\.[A-Za-z0-9]+)+$";

export function validateHostIdentity(control: AbstractControl) {
  let isIpValid: boolean;
  let isHostNameValid: boolean;
  let regexIp = new RegExp(ipPattern);
  let regexHostName = new RegExp(hostNamePattern);
  isIpValid = regexIp.test(control.value);
  isHostNameValid = regexHostName.test(control.value);
  if (isHostNameValid || isIpValid) return null;
  return { invalidHostIdentity: true };
}
