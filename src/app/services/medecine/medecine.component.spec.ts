import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecineComponent } from './medecine.component';

describe('MedecineComponent', () => {
  let component: MedecineComponent;
  let fixture: ComponentFixture<MedecineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedecineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedecineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
