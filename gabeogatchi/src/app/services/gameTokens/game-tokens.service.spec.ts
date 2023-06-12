import { TestBed } from '@angular/core/testing';

import { GameTokensService } from './game-tokens.service';

describe('GameTokensService', () => {
  let service: GameTokensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameTokensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
