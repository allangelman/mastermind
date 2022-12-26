import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlayersService } from './players.service';
import { Player } from './entities/player.entity';
import { CreatePlayerInput } from './dto/create-player.input';

@Resolver(() => Player)
export class PlayersResolver {
  constructor(private readonly playersService: PlayersService) {}

  @Mutation(() => Player)
  createPlayer(
    @Args('createPlayerInput') createPlayerInput: CreatePlayerInput,
  ): Promise<Player> {
    return this.playersService.create(createPlayerInput);
  }

  @Query(() => [String], { name: 'findAllPlayerNames' })
  findAllPlayerNames(): Promise<string[]> {
    return this.playersService.findAllNames();
  }

  @Query(() => Player, { name: 'findPlayerByName' })
  findOne(@Args('name') name: string): Promise<Player> {
    return this.playersService.findOneByName(name);
  }

  // @Mutation(() => Player)
  // updatePlayer(@Args('updatePlayerInput') updatePlayerInput: UpdatePlayerInput) {
  //   return this.playersService.update(updatePlayerInput.id, updatePlayerInput);
  // }

  // @Mutation(() => Player)
  // removePlayer(@Args('id', { type: () => Int }) id: number) {
  //   return this.playersService.remove(id);
  // }
}
