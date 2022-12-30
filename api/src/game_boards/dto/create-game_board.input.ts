import { InputType, Field } from '@nestjs/graphql';

@InputType({
  description:
    'Provides the fields and values to use when creating a game board.',
})
export class CreateGameBoardInput {
  @Field({ description: 'game_id' })
  game_id: string;

  @Field({ description: 'name', nullable: true })
  name?: string;
}
