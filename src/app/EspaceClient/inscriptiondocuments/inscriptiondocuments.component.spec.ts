import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptiondocumentsComponent } from './inscriptiondocuments.component';

describe('InscriptiondocumentsComponent', () => {
  let component: InscriptiondocumentsComponent;
  let fixture: ComponentFixture<InscriptiondocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptiondocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InscriptiondocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
