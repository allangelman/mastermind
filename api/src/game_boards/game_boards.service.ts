import { Injectable } from '@nestjs/common';
import { CreateGameBoardInput } from './dto/create-game_board.input';
import { InjectRepository } from '@nestjs/typeorm';
import { GameBoard } from './entities/game_board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameBoardsService {
  constructor(
    @InjectRepository(GameBoard)
    private gameBoardsRepository: Repository<GameBoard>,
  ) {}

  async create(createGameBoardInput: CreateGameBoardInput): Promise<GameBoard> {
    let gameBoard = new GameBoard();

    gameBoard.game_id = createGameBoardInput.game_id;
    gameBoard = await this.gameBoardsRepository.save(gameBoard);
    return gameBoard;
  }

  // findAll() {
  //   return `This action returns all games`;
  // }

  findOneById(id: string) {
    return this.gameBoardsRepository.findOneBy({ id });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} game`;
  // }
}
