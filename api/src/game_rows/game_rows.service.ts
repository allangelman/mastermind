import { Injectable } from '@nestjs/common';
import { CreateGameRowInput } from './dto/create-game_row.input';

import { InjectRepository } from '@nestjs/typeorm';
import { GameRow } from './entities/game_row.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameRowsService {
  constructor(
    @InjectRepository(GameRow)
    private gameRowsRepository: Repository<GameRow>,
  ) {}

  async create(createGameBoardInput: CreateGameRowInput): Promise<GameRow> {
    let gameRow = new GameRow();

    gameRow.values = createGameBoardInput.values;
    gameRow.feedback = createGameBoardInput.feedback;
    gameRow.row_num = createGameBoardInput.row_num;
    gameRow.game_board_id = createGameBoardInput.game_board_id;
    gameRow = await this.gameRowsRepository.save(gameRow);
    return gameRow;
  }

  findOneById(id: string) {
    return this.gameRowsRepository.findOneBy({ id });
  }
}
