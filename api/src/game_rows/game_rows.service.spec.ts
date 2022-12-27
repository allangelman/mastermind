import { Test, TestingModule } from '@nestjs/testing';
import { GameRowsService } from './game_rows.service';

describe('GameRowsService', () => {
  let service: GameRowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameRowsService],
    }).compile();

    service = module.get<GameRowsService>(GameRowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
