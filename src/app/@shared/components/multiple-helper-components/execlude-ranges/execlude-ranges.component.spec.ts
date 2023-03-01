import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecludeRangesComponent } from './execlude-ranges.component';

describe('ExecludeRangesComponent', () => {
  let component: ExecludeRangesComponent;
  let fixture: ComponentFixture<ExecludeRangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecludeRangesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecludeRangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
