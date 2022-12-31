import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateMultGameBoardInput } from './dto/update-game.input';

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
  findOne(
    @Args('id', { type: () => ID, description: 'ID of the game.' }) id: string,
  ): Promise<Game> {
    return this.gamesService.findOneById(id);
  }

  @Mutation(() => Game)
  updateMultiplayerGameResult(
    @Args('updateGameBoardInput')
    updateGameBoardInput: UpdateMultGameBoardInput,
  ): Promise<Game> {
    return this.gamesService.updateResult(
      updateGameBoardInput.id,
      updateGameBoardInput.multiplayer_result,
    );
  }
}
