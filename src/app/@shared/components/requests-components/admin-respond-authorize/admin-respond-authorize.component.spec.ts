import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRespondAuthorizeComponent } from './admin-respond-authorize.component';

describe('AdminRespondAuthorizeComponent', () => {
  let component: AdminRespondAuthorizeComponent;
  let fixture: ComponentFixture<AdminRespondAuthorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRespondAuthorizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRespondAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
