import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZfrActComponent } from './zfr-act.component';

describe('ZfrActComponent', () => {
  let component: ZfrActComponent;
  let fixture: ComponentFixture<ZfrActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZfrActComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZfrActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
