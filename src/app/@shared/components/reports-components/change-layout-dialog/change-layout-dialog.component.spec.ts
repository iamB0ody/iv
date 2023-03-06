import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLayoutDialogComponent } from './change-layout-dialog.component';

describe('ChangeLayoutDialogComponent', () => {
  let component: ChangeLayoutDialogComponent;
  let fixture: ComponentFixture<ChangeLayoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeLayoutDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeLayoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
