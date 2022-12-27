import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlayerInput } from './dto/create-player.input';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  async create(createPlayerInput: CreatePlayerInput): Promise<Player> {
    let player = new Player();

    player.name = createPlayerInput.name;
    player = await this.playersRepository.save(player);
    return player;
  }

  async findAllNames(): Promise<string[]> {
    const players = await this.playersRepository.find();
    const playerNames = players.map((player) => player.name);
    return playerNames;
  }

  findOneByName(name: string): Promise<Player> {
    return this.playersRepository.findOneBy({ name });
  }
}
