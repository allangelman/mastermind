import { ObjectType, Field } from '@nestjs/graphql';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { ID } from '@nestjs/graphql/dist/scalars';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { Column } from 'typeorm/decorator/columns/Column';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';

@ObjectType({ description: 'Represents information about a game board.' })
@Entity('game_boards')
export class GameBoard {
  @Field(() => ID, { description: 'ID of the game.' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field({ description: 'id of the game.' })
  @Column({ name: 'game_id' })
  game_id!: string;

  @Field({ description: 'name.', nullable: true })
  @Column({ name: 'name', nullable: true })
  name?: string;

  @Field({ description: 'result.', nullable: true })
  @Column({ name: 'result', nullable: true })
  result?: string;

  @Field({ description: 'Creation timestamp of the game.' })
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @Field({ description: 'Last updated timestamp of the game.' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
