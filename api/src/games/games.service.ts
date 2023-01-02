import { Injectable } from '@nestjs/common';
import { CreateGameInput } from './dto/create-game.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  async create(createGameInput: CreateGameInput): Promise<Game> {
    let game = new Game();

    game.code = createGameInput.code;
    game = await this.gamesRepository.save(game);
    return game;
  }

  async findOneById(id: string): Promise<Game> {
    return this.gamesRepository.findOneBy({ id });
  }

  async updateResult(id: string, result: string): Promise<Game> {
    await this.gamesRepository.update({ id }, { multiplayer_result: result });
    return this.gamesRepository.findOneBy({ id });
  }
}
