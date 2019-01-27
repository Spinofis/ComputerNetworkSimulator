import { FormGroup, AbstractControl } from '@angular/forms';

export function hasControlErrors(formGroup: FormGroup): boolean {
  let errors: boolean = false;
  Object.keys(formGroup.controls).forEach(key => {
    let abstractControl: AbstractControl = formGroup.get(key);
    abstractControl.markAsDirty();
    if (abstractControl.invalid) errors = true;
  });
  return errors;
}
