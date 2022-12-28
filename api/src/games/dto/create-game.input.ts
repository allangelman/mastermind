import { InputType, Field } from '@nestjs/graphql';

@InputType({
  description: 'Provides the fields and values to use when creating a game.',
})
export class CreateGameInput {
  @Field({ description: 'code' })
  code: string;
}
