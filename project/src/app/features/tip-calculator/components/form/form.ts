import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';

import { DecimalPipe } from '@angular/common';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnlyNumbersDirective } from '@app/shared/directives/only-numbers-directive';
import { SelectOnFocusDirective } from '@app/shared/directives/select-on-focus-directive';
import { conditionalTipValidator } from '@app/shared/validators/tip-validators';
import { debounceTime } from 'rxjs';

const CUSTOM_TIP = 'CUSTOM_TIP';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, OnlyNumbersDirective, SelectOnFocusDirective, DecimalPipe],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form implements OnInit {
  tipAmount: WritableSignal<number> = signal(0);
  totalAmount: WritableSignal<number> = signal(0);
  formTip = new FormGroup(
    {
      bill: new FormControl('', [Validators.required, Validators.min(1)]),
      tip: new FormControl(CUSTOM_TIP, [Validators.min(1), Validators.max(100)]),
      customTip: new FormControl(''),
      nPeople: new FormControl('', [Validators.required, Validators.min(1)]),
    },
    { validators: [conditionalTipValidator] }
  );

  ngOnInit(): void {
    this.formTip.controls['tip'].valueChanges.subscribe((value) => {
      if (value && ![CUSTOM_TIP].includes(value)) {
        this.formTip.controls['customTip'].patchValue('');
      }
    });

    this.formTip.valueChanges.pipe(debounceTime(300)).subscribe((values) => {
      const bill = parseFloat(values.bill || '0');
      const nPeople = parseInt(values.nPeople || '0', 10);
      const tipControlValue = values.tip;
      const customTipValue = parseFloat(values.customTip || '0');

      const tipPercent =
        tipControlValue === CUSTOM_TIP ? customTipValue : parseFloat(tipControlValue || '0');

      if (bill > 0 && nPeople > 0 && tipPercent >= 0) {
        const tipAmount = (bill * (tipPercent / 100)) / nPeople;
        const totalAmount = bill / nPeople + tipAmount;

        this.tipAmount.set(tipAmount);
        this.totalAmount.set(totalAmount);
      } else {
        this.tipAmount.set(0);
        this.totalAmount.set(0);
      }
    });
  }

  enterCustomTip(evt: KeyboardEvent) {
    if (['Enter', 'Delete', ' '].includes(evt.key) || !isNaN(parseInt(evt.key, 10))) {
      this.formTip.controls['tip'].patchValue('CUSTOM_TIP');
    }
  }

  reset() {
    this.formTip.reset({
      bill: '',
      tip: CUSTOM_TIP,
      customTip: '',
      nPeople: '',
    });

    this.tipAmount.set(0);
    this.totalAmount.set(0);

    setTimeout(() => {
      const billInput = document.getElementById('bill');
      billInput?.focus();
    });
  }
}
