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
