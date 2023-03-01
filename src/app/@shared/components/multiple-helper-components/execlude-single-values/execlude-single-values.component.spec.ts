import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecludeSingleValuesComponent } from './execlude-single-values.component';

describe('ExecludeSingleValuesComponent', () => {
  let component: ExecludeSingleValuesComponent;
  let fixture: ComponentFixture<ExecludeSingleValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecludeSingleValuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecludeSingleValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
