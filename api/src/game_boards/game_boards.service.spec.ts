import { Test, TestingModule } from '@nestjs/testing';
import { GameBoardsService } from './game_boards.service';

describe('GameBoardsService', () => {
  let service: GameBoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameBoardsService],
    }).compile();

    service = module.get<GameBoardsService>(GameBoardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
