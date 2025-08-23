import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
})
export class OnlyNumbersDirective {
  private _onlyIntegers = false;

  @Input('appOnlyNumbers')
  set onlyIntegers(value: string | boolean | null | undefined) {
    if (value === null || value === undefined) {
      this._onlyIntegers = false;
    } else {
      this._onlyIntegers = value !== 'false' && value !== false;
    }
  }
  get onlyIntegers(): boolean {
    return this._onlyIntegers;
  }

  private decimalRegex = /^\d*\.?\d{0,2}$/;
  private integerRegex = /^\d*$/;

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text') ?? '';

    const isValid = this.onlyIntegers
      ? this.integerRegex.test(pastedText)
      : this.decimalRegex.test(pastedText);

    if (!isValid) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    const isValid = this.onlyIntegers
      ? this.integerRegex.test(value)
      : this.decimalRegex.test(value);

    if (!isValid) {
      inputElement.value = this.sanitizeValue(value);
    }
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): boolean {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    const key = event.key;

    if (this.onlyIntegers) {
      if (!/\d/.test(key)) {
        event.preventDefault();
        return false;
      }
    } else {
      if (!/[\d.]/.test(key)) {
        event.preventDefault();
        return false;
      }

      if (key === '.' && currentValue.includes('.')) {
        event.preventDefault();
        return false;
      }

      const [, decimalPart] = currentValue.split('.');
      if (
        decimalPart !== undefined &&
        decimalPart.length >= 2 &&
        input.selectionStart! > currentValue.indexOf('.')
      ) {
        event.preventDefault();
        return false;
      }
    }

    return true;
  }

  private sanitizeValue(value: string): string {
    let sanitized = value.replace(/[^0-9.]/g, '');

    if (this.onlyIntegers) {
      return sanitized.replace(/\D/g, '');
    }

    const parts = sanitized.split('.');
    sanitized = parts[0];
    if (parts.length > 1) {
      sanitized += '.' + parts[1].slice(0, 2);
    }

    return sanitized;
  }
}
