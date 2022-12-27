import { InputType, Field } from '@nestjs/graphql';

@InputType({
  description: 'Provides the fields and values to use when creating a game.',
})
export class CreateGameBoardInput {
  @Field({ description: 'game_id' })
  game_id: string;
}
