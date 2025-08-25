import { Component, provideZonelessChangeDetection } from '@angular/core';
import { AutoFocusDirective } from './auto-focus-directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  standalone: true,
  imports: [AutoFocusDirective],
  template: `<input type="text" [appAutoFocus] />`,
})
class TestComponent {}

describe('AutoFocusDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should focus the input element after view init', async () => {
    const inputEl = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    // Wait for the setTimeout in ngAfterViewInit to trigger
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.activeElement).toBe(inputEl);
  });
});
