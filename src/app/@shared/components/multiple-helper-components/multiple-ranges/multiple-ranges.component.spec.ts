import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleRangesComponent } from './multiple-ranges.component';

describe('MultipleRangesComponent', () => {
  let component: MultipleRangesComponent;
  let fixture: ComponentFixture<MultipleRangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleRangesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleRangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
