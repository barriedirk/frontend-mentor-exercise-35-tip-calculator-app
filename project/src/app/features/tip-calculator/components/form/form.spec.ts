import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Form } from './form';

describe('Form Component', () => {
  let component: Form;
  let fixture: ComponentFixture<Form>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Form],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Form);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should calculate tip and total correctly', async () => {
    component.formTip.setValue({
      bill: '100',
      tip: '10', // 10%
      customTip: '',
      nPeople: '2',
    });

    fixture.detectChanges();

    // I added this line because the calculation is inside of valueChanges (rxjs) and there is a debounceTime(300)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await fixture.whenStable();

    // 🪵 Debugging output
    console.log('Form Valid:', component.formTip.valid);
    console.log('Form Value:', component.formTip.value);
    console.log('Tip Amount:', component.tipAmount());
    console.log('Total Amount:', component.totalAmount());

    expect(component.tipAmount()).toBe(5); // 10% of 100 = 10 / 2 = 5
    expect(component.totalAmount()).toBe(55); // 100 + 10 = 110 / 2 = 55
  });

  it('should reset amounts if input is invalid', () => {
    component.formTip.setValue({
      bill: '',
      tip: '10',
      customTip: '',
      nPeople: '',
    });

    fixture.detectChanges();

    expect(component.tipAmount()).toBe(0);
    expect(component.totalAmount()).toBe(0);
  });
});
