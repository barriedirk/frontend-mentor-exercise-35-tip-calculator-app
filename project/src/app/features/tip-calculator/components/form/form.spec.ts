import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Form } from './form';
import { ReactiveFormsModule } from '@angular/forms';

describe('Form Component', () => {
  let component: Form;
  let fixture: ComponentFixture<Form>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [Form],
    });

    fixture = TestBed.createComponent(Form);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should calculate tip and total correctly', () => {
    component.formTip.setValue({
      bill: '100',
      tip: '10', // 10%
      customTip: '',
      nPeople: '2',
    });

    fixture.detectChanges();

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
