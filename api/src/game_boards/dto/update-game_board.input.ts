import { InputType, Field } from '@nestjs/graphql';

@InputType({
  description:
    'Provides the fields and values to used to updare the game board result.',
})
export class UpdateGameBoardInput {
  @Field({ description: 'id' })
  id: string;

  @Field({ description: 'result' })
  result: string;
}
