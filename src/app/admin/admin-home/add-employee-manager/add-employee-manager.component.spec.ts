import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeManagerComponent } from './add-employee-manager.component';

describe('AddEmployeeManagerComponent', () => {
  let component: AddEmployeeManagerComponent;
  let fixture: ComponentFixture<AddEmployeeManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeeManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
