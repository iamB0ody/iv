import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotesDialogComponent } from './admin-notes-dialog.component';

describe('AdminNotesDialogComponent', () => {
  let component: AdminNotesDialogComponent;
  let fixture: ComponentFixture<AdminNotesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNotesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNotesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
