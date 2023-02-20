import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReasonDialogComponent } from './admin-reason-dialog.component';

describe('AdminReasonDialogComponent', () => {
  let component: AdminReasonDialogComponent;
  let fixture: ComponentFixture<AdminReasonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReasonDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReasonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
