import { InputType, Int, Field } from '@nestjs/graphql';

@InputType({
  description: 'Provides the fields and values to use when creating a player.',
})
export class CreatePlayerInput {
  @Field({ description: 'Name of player' })
  name: string;
}
