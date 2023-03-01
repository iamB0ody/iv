import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleHelperDialogComponent } from './multiple-helper-dialog.component';

describe('MultipleHelperDialogComponent', () => {
  let component: MultipleHelperDialogComponent;
  let fixture: ComponentFixture<MultipleHelperDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleHelperDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleHelperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
