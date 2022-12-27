import { Test, TestingModule } from '@nestjs/testing';
import { GameRowsResolver } from './game_rows.resolver';
import { GameRowsService } from './game_rows.service';

describe('GameRowsResolver', () => {
  let resolver: GameRowsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameRowsResolver, GameRowsService],
    }).compile();

    resolver = module.get<GameRowsResolver>(GameRowsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
