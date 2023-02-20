import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdAddAuthorizeDialogComponent } from './ad-add-authorize-dialog.component';

describe('AdAddAuthorizeDialogComponent', () => {
  let component: AdAddAuthorizeDialogComponent;
  let fixture: ComponentFixture<AdAddAuthorizeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdAddAuthorizeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdAddAuthorizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
