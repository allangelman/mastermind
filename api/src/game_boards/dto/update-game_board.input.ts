import { CreateGameBoardInput } from './create-game_board.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGameBoardInput extends PartialType(CreateGameBoardInput) {
  @Field(() => Int)
  id: number;
}
