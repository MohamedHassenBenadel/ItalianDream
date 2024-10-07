import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientaccessComponent } from './clientaccess.component';

describe('ClientaccessComponent', () => {
  let component: ClientaccessComponent;
  let fixture: ComponentFixture<ClientaccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientaccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
