import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersummaryComponent } from './managersummary.component';

describe('ManagersummaryComponent', () => {
  let component: ManagersummaryComponent;
  let fixture: ComponentFixture<ManagersummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagersummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagersummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
