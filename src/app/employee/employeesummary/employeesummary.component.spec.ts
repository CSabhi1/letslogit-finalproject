import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesummaryComponent } from './employeesummary.component';

describe('EmployeesummaryComponent', () => {
  let component: EmployeesummaryComponent;
  let fixture: ComponentFixture<EmployeesummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
