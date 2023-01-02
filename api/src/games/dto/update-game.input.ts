import { InputType, Field } from '@nestjs/graphql';

@InputType({
  description:
    'Provides the fields and values to used to updare the game board result.',
})
export class UpdateMultiplayerResultInput {
  @Field({ description: 'id' })
  id: string;

  @Field({ description: 'multiplayer_result' })
  multiplayer_result: string;
}
