import { InputType, Field } from '@nestjs/graphql';

@InputType({
  description:
    'Provides the fields and values to use when creating a game row.',
})
export class CreateGameRowInput {
  @Field({ description: 'game_id' })
  game_board_id: string;

  @Field({ description: 'number of the game row.' })
  row_num: number;

  @Field({ description: 'values of the game row.' })
  values: string;

  @Field({ description: 'feedback of the game row.' })
  feedback: string;
}
