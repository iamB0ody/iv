import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAskDialogComponent } from './user-ask-dialog.component';

describe('UserAskDialogComponent', () => {
  let component: UserAskDialogComponent;
  let fixture: ComponentFixture<UserAskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAskDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
