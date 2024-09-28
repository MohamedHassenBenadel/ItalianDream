import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedoucmentsComponent } from './managedoucments.component';

describe('ManagedoucmentsComponent', () => {
  let component: ManagedoucmentsComponent;
  let fixture: ComponentFixture<ManagedoucmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagedoucmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagedoucmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
