import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRemoveAuthorizeComponent } from './admin-remove-authorize.component';

describe('AdminRemoveAuthorizeComponent', () => {
  let component: AdminRemoveAuthorizeComponent;
  let fixture: ComponentFixture<AdminRemoveAuthorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRemoveAuthorizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRemoveAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
