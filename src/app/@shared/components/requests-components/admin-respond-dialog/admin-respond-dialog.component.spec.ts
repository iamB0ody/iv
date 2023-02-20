import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRespondDialogComponent } from './admin-respond-dialog.component';

describe('AdminRespondDialogComponent', () => {
  let component: AdminRespondDialogComponent;
  let fixture: ComponentFixture<AdminRespondDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRespondDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRespondDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
