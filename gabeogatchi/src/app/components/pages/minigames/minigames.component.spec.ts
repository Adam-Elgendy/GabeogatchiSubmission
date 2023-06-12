import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigamesComponent } from './minigames.component';

describe('MinigamesComponent', () => {
  let component: MinigamesComponent;
  let fixture: ComponentFixture<MinigamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinigamesComponent]
    });
    fixture = TestBed.createComponent(MinigamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
