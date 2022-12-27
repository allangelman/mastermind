import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';

@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Mutation(() => Game)
  createGame(
    @Args('createGameInput') createGameInput: CreateGameInput,
  ): Promise<Game> {
    return this.gamesService.create(createGameInput);
  }

  @Query(() => Game, { name: 'findGameById' })
  findOne(@Args('id') id: string): Promise<Game> {
    return this.gamesService.findOneById(id);
  }
}
