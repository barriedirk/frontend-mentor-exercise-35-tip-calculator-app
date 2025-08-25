import { OnlyNumbersDirective } from './only-numbers-directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [OnlyNumbersDirective, FormsModule],
  template: `<input type="text" [appOnlyNumbers]="true" [(ngModel)]="value" />`,
})
class IntegerOnlyComponent {
  value = '';
}

@Component({
  standalone: true,
  imports: [OnlyNumbersDirective, FormsModule],
  template: `<input type="text" [appOnlyNumbers]="false" [(ngModel)]="value" />`,
})
class DecimalAllowedComponent {
  value = '';
}

describe('OnlyNumbersDirective (integer mode)', () => {
  let fixture: ComponentFixture<IntegerOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegerOnlyComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(IntegerOnlyComponent);
    fixture.detectChanges();
  });

  it('should strip non-digit characters when only integers are allowed', () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    inputEl.value = 'abc123';
    inputEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(inputEl.value).toBe('123');
  });

  it('should prevent decimals when only integers are allowed', () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    inputEl.value = '12.34';
    inputEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(inputEl.value).toBe('1234');
  });
});

describe('OnlyNumbersDirective (decimal mode)', () => {
  let fixture: ComponentFixture<DecimalAllowedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecimalAllowedComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DecimalAllowedComponent);
    fixture.detectChanges();
  });

  it('should allow valid decimal input and trim to 2 digits after decimal', () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    inputEl.value = '12.3456';
    inputEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(inputEl.value).toBe('12.34');
  });

  it('should strip invalid characters and keep only valid decimal digits', () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

    inputEl.value = 'ab1.2c3.45';
    inputEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(inputEl.value).toBe('1.23');
  });
});
