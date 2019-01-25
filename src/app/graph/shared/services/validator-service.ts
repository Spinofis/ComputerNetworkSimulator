import { Injectable } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";

@Injectable()
export class ValidatorService {
  private ipPattern: string =
    "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";

  private netIpWithMaskPattern: string =
    "^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$";

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
}
