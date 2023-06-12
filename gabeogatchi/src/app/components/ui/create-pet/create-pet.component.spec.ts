import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePetComponent } from './create-pet.component';

describe('CreatePetComponent', () => {
  let component: CreatePetComponent;
  let fixture: ComponentFixture<CreatePetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePetComponent]
    });
    fixture = TestBed.createComponent(CreatePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
