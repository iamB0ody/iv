import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSingleValuesComponent } from './multiple-single-values.component';

describe('MultipleSingleValuesComponent', () => {
  let component: MultipleSingleValuesComponent;
  let fixture: ComponentFixture<MultipleSingleValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleSingleValuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleSingleValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
