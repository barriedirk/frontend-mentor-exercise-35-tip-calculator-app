/*
  Documentation about the imports: 
  ----------------------------------------------------------------
- provideZonelessChangeDetection(), It configures the Angular testing environment to work without Zone.js.
  It tells Angular to run change detection manually, so you need to call fixture.detectChanges() explicitly.
  Eliminates the need for importing zone.js or mocking NgZone manually in tests.
- TestBed: Creates and configures an Angular testing module.
- ComponentFixture: Represents the test instance of the component.
- By: Lets us query elements from the DOM.
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SelectOnFocusDirective } from './select-on-focus-directive';

// create a simple dummy component
// In angular 20, the components are standalone and it's neccesary to indicate the imports
@Component({
  standalone: true,
  imports: [SelectOnFocusDirective],
  template: `<input type="text" value="test" appSelectOnFocus />`,
})
class TestComponent {}

describe('SelectOnFocusDirective', () => {
  // Setup the Test Environment

  // Note:
  // - We declare both the test component and your directive so Angular knows about them.
  // - We create the test component with TestBed.createComponent().
  // - We grab the <input> using By.css('input').
  // - We call fixture.detectChanges() to trigger Angular's change detection and initialize the directive.

  // begin
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    // TestBed.configureTestingModule({
    //   // No need to import the directive separately because it’s already imported inside TestComponent.
    //   // declarations: [TestComponent, SelectOnFocusDirective], // if the component is not standalone
    //   imports: [TestComponent],
    // });

    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });
  // end

  it('should create the directive instance', () => {
    // We get the instance of your directive from the input element's injector.
    // We assert that the directive was created.

    const directive = inputEl.injector.get(SelectOnFocusDirective);
    expect(directive).toBeTruthy();
  });

  it('should select the input text on focus', () => {
    // spyOn(nativeInput, 'select'): We spy on the .select() method to see if it gets called.
    // dispatchEvent(new Event('focus')): We simulate focusing the input.
    // fixture.detectChanges(): Triggers any lifecycle events (optional here, but good practice).
    // expect(nativeInput.select).toHaveBeenCalled(): Checks if the directive correctly triggered .select().

    const nativeInput = inputEl.nativeElement;

    spyOn(nativeInput, 'select');

    nativeInput.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    expect(nativeInput.select).toHaveBeenCalled();
  });
});
