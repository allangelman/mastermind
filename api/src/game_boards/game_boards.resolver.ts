import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { GameBoardsService } from './game_boards.service';
import { GameBoard } from './entities/game_board.entity';
import { CreateGameBoardInput } from './dto/create-game_board.input';
import { GameRow } from 'src/game_rows/entities/game_row.entity';
import { GameRowsService } from 'src/game_rows/game_rows.service';
import { UpdateGameBoardInput } from './dto/update-game_board.input';

@Resolver(() => GameBoard)
export class GameBoardsResolver {
  constructor(
    private readonly gameBoardsService: GameBoardsService,
    private readonly gameRowsService: GameRowsService,
  ) {}

  @Mutation(() => GameBoard)
  createGameBoard(
    @Args('createGameBoardInput') createGameBoardInput: CreateGameBoardInput,
  ): Promise<GameBoard> {
    return this.gameBoardsService.create(createGameBoardInput);
  }

  @Mutation(() => GameBoard)
  updateGameResult(
    @Args('updateGameBoardInput') updateGameBoardInput: UpdateGameBoardInput,
  ): Promise<GameBoard> {
    return this.gameBoardsService.updateResult(
      updateGameBoardInput.id,
      updateGameBoardInput.result,
    );
  }

  @Query(() => GameBoard, { name: 'findGameBoardById' })
  findOne(
    @Args('id', { type: () => ID, description: 'ID of the board.' }) id: string,
  ): Promise<GameBoard> {
    return this.gameBoardsService.findOneById(id);
  }

  @ResolveField(() => [GameRow], {
    description: 'All workspaces a user belongs to.',
  })
  async rows(@Parent() parent: GameBoard): Promise<GameRow[]> {
    return this.gameRowsService.findByBoardId(parent.id);
  }
}
