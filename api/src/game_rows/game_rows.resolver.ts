import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GameRowsService } from './game_rows.service';
import { GameRow } from './entities/game_row.entity';
import { CreateGameRowInput } from './dto/create-game_row.input';

@Resolver(() => GameRow)
export class GameRowsResolver {
  constructor(private readonly gameRowsService: GameRowsService) {}

  @Mutation(() => GameRow)
  createGameRow(
    @Args('createGameRowInput') createGameRowInput: CreateGameRowInput,
  ): Promise<GameRow> {
    return this.gameRowsService.create(createGameRowInput);
  }

  @Query(() => GameRow, { name: 'findGameRowById' })
  findOne(@Args('id') id: string): Promise<GameRow> {
    return this.gameRowsService.findOneById(id);
  }
}
