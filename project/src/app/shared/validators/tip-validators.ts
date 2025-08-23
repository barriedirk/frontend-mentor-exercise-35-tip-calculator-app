import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export const conditionalTipValidator: ValidatorFn = (
  control: AbstractControl
): { [key: string]: any } | null => {
  const formGroup = control as FormGroup;
  const tipValue = formGroup.get('tip')?.value;
  const customTipValue = formGroup.get('customTip')?.value;

  if (isNaN(tipValue) && isNaN(customTipValue)) {
    return { tipRequired: true };
  }
  return null;
};
