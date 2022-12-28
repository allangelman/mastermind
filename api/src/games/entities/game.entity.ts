import { ObjectType, Field } from '@nestjs/graphql';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { ID } from '@nestjs/graphql/dist/scalars';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { Column } from 'typeorm/decorator/columns/Column';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';

@ObjectType({ description: 'Represents information about a game.' })
@Entity('games')
export class Game {
  @Field(() => ID, { description: 'ID of the game.' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field({ description: 'code for the game.' })
  @Column({ name: 'code' })
  code!: string;

  @Field({ description: 'Creation timestamp of the game.' })
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @Field({ description: 'Last updated timestamp of the game.' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
