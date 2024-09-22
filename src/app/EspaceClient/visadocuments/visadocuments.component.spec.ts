import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisadocumentsComponent } from './visadocuments.component';

describe('VisadocumentsComponent', () => {
  let component: VisadocumentsComponent;
  let fixture: ComponentFixture<VisadocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisadocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisadocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
