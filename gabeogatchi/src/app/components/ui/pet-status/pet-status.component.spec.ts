import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetStatusComponent } from './pet-status.component';

describe('PetStatusComponent', () => {
  let component: PetStatusComponent;
  let fixture: ComponentFixture<PetStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetStatusComponent]
    });
    fixture = TestBed.createComponent(PetStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
