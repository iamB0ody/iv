import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedNotificationComponent } from './selected-notification.component';

describe('SelectedNotificationComponent', () => {
  let component: SelectedNotificationComponent;
  let fixture: ComponentFixture<SelectedNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
