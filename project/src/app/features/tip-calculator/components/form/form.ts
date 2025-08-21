import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  formTip = new FormGroup({
    bill: new FormControl(),
    tip: new FormControl(),
    customTip: new FormControl(),
    nPeople: new FormControl(),
  });

  submit() {}
}
