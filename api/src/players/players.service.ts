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

  async create(createPlayerInput: CreatePlayerInput) {
    let player = new Player();

    player.name = createPlayerInput.name;
    player = await this.playersRepository.save(player);
    return player;
  }

  // findAll() {
  //   return `This action returns all players`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} player`;
  // }

  // update(id: number, updatePlayerInput: UpdatePlayerInput) {
  //   return `This action updates a #${id} player`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} player`;
  // }
}
