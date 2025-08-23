import { OnlyNumbersDirective } from './only-numbers-directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  template: `<input type="text" [appOnlyNumbers]="true" [(ngModel)]="value" />`,
})
class TestComponent {
  value = '';
}

describe('OnlyNumbersDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, OnlyNumbersDirective],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should allow only digits', () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = 'abc123';
    inputEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(inputEl.value).toBe('123');
  });

  it('should allow only valid decimal input when integers are not required', () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = '12.3456';
    inputEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(inputEl.value).toBe('12.34');
  });
});
