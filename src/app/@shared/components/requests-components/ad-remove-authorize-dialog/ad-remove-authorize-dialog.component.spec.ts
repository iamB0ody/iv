import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdRemoveAuthorizeDialogComponent } from './ad-remove-authorize-dialog.component';

describe('AdRemoveAuthorizeDialogComponent', () => {
  let component: AdRemoveAuthorizeDialogComponent;
  let fixture: ComponentFixture<AdRemoveAuthorizeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdRemoveAuthorizeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdRemoveAuthorizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
