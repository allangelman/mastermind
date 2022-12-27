import { Test, TestingModule } from '@nestjs/testing';
import { GameBoardsResolver } from './game_boards.resolver';
import { GameBoardsService } from './game_boards.service';

describe('GameBoardsResolver', () => {
  let resolver: GameBoardsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameBoardsResolver, GameBoardsService],
    }).compile();

    resolver = module.get<GameBoardsResolver>(GameBoardsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
