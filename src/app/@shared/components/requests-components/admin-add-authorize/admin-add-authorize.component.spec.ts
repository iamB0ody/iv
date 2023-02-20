import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAuthorizeComponent } from './admin-add-authorize.component';

describe('AdminAddAuthorizeComponent', () => {
  let component: AdminAddAuthorizeComponent;
  let fixture: ComponentFixture<AdminAddAuthorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddAuthorizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
