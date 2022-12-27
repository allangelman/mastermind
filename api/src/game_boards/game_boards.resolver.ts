import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GameBoardsService } from './game_boards.service';
import { GameBoard } from './entities/game_board.entity';
import { CreateGameBoardInput } from './dto/create-game_board.input';

@Resolver(() => GameBoard)
export class GameBoardsResolver {
  constructor(private readonly gameBoardsService: GameBoardsService) {}

  @Mutation(() => GameBoard)
  createGameBoard(
    @Args('createGameBoardInput') createGameBoardInput: CreateGameBoardInput,
  ): Promise<GameBoard> {
    return this.gameBoardsService.create(createGameBoardInput);
  }

  @Query(() => GameBoard, { name: 'findGameBoardById' })
  findOne(@Args('id') id: string): Promise<GameBoard> {
    return this.gameBoardsService.findOneById(id);
  }
}
