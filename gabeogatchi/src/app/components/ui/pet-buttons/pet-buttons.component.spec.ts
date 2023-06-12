import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetButtonsComponent } from './pet-buttons.component';

describe('PetButtonsComponent', () => {
  let component: PetButtonsComponent;
  let fixture: ComponentFixture<PetButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetButtonsComponent]
    });
    fixture = TestBed.createComponent(PetButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
