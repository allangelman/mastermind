import { Injectable } from '@nestjs/common';
import { CreateGameBoardInput } from './dto/create-game_board.input';
import { InjectRepository } from '@nestjs/typeorm';
import { GameBoard } from './entities/game_board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameBoardsService {
  constructor(
    @InjectRepository(GameBoard)
    private gamesRepository: Repository<GameBoard>,
  ) {}

  async create(createGameBoardInput: CreateGameBoardInput): Promise<GameBoard> {
    let gameBoard = new GameBoard();

    gameBoard.game_id = createGameBoardInput.game_id;
    gameBoard = await this.gamesRepository.save(gameBoard);
    return gameBoard;
  }

  // findAll() {
  //   return `This action returns all games`;
  // }

  findOneById(id: string) {
    return this.gamesRepository.findOneBy({ id });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} game`;
  // }
}
