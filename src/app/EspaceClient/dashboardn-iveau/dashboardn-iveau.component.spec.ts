import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardnIveauComponent } from './dashboardn-iveau.component';

describe('DashboardnIveauComponent', () => {
  let component: DashboardnIveauComponent;
  let fixture: ComponentFixture<DashboardnIveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardnIveauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardnIveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
