import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoursedocumentsComponent } from './boursedocuments.component';

describe('BoursedocumentsComponent', () => {
  let component: BoursedocumentsComponent;
  let fixture: ComponentFixture<BoursedocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoursedocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoursedocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
