import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportResultComComponent } from './report-result-com.component';

describe('ReportResultComComponent', () => {
  let component: ReportResultComComponent;
  let fixture: ComponentFixture<ReportResultComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportResultComComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportResultComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
