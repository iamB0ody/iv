import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionCriteriaComComponent } from './selection-criteria-com.component';

describe('SelectionCriteriaComComponent', () => {
  let component: SelectionCriteriaComComponent;
  let fixture: ComponentFixture<SelectionCriteriaComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionCriteriaComComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionCriteriaComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
