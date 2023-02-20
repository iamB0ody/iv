import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteReportsComComponent } from './favorite-reports-com.component';

describe('FavoriteReportsComComponent', () => {
  let component: FavoriteReportsComComponent;
  let fixture: ComponentFixture<FavoriteReportsComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteReportsComComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteReportsComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
