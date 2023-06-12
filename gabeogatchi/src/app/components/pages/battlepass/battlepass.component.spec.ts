import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlepassComponent } from './battlepass.component';

describe('BattlepassComponent', () => {
  let component: BattlepassComponent;
  let fixture: ComponentFixture<BattlepassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BattlepassComponent]
    });
    fixture = TestBed.createComponent(BattlepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
