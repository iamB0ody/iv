import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAskAuthorizeComponent } from './user-ask-authorize.component';

describe('UserAskAuthorizeComponent', () => {
  let component: UserAskAuthorizeComponent;
  let fixture: ComponentFixture<UserAskAuthorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAskAuthorizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAskAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
