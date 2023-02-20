import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReportsComComponent } from './all-reports-com.component';

describe('AllReportsComComponent', () => {
  let component: AllReportsComComponent;
  let fixture: ComponentFixture<AllReportsComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllReportsComComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllReportsComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
