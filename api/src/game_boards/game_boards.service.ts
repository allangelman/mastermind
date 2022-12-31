import { Injectable } from '@nestjs/common';
import { CreateGameBoardInput } from './dto/create-game_board.input';
import { InjectRepository } from '@nestjs/typeorm';
import { GameBoard } from './entities/game_board.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class GameBoardsService {
  constructor(
    @InjectRepository(GameBoard)
    private gameBoardsRepository: Repository<GameBoard>,
  ) {}

  async create(createGameBoardInput: CreateGameBoardInput): Promise<GameBoard> {
    let gameBoard = new GameBoard();

    gameBoard.game_id = createGameBoardInput.game_id;
    gameBoard.name = createGameBoardInput.name;
    gameBoard = await this.gameBoardsRepository.save(gameBoard);
    return gameBoard;
  }

  //TODO:this should have return type
  findOneById(id: string) {
    return this.gameBoardsRepository.findOneBy({ id });
  }

  findBoardsByGameId(gameId: string, myBoardId: string): Promise<GameBoard[]> {
    return this.gameBoardsRepository.find({
      where: {
        game_id: gameId,
        id: Not(myBoardId),
      },
    });
  }

  async updateResult(id: string, result: string): Promise<GameBoard> {
    await this.gameBoardsRepository.update({ id }, { result: result });
    return this.gameBoardsRepository.findOneBy({ id });
  }
}
