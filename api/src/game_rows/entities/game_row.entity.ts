import { ObjectType, Field } from '@nestjs/graphql';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { ID } from '@nestjs/graphql/dist/scalars';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { Column } from 'typeorm/decorator/columns/Column';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';

@ObjectType({ description: 'Represents information about a game row.' })
@Entity('game_rows')
export class GameRow {
  @Field(() => ID, { description: 'ID of the game row.' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field({ description: 'number of the game row.' })
  @Column({ name: 'row_num' })
  row_num!: number;

  @Field({ description: 'id of the game_board.' })
  @Column({ name: 'game_board_id' })
  game_board_id!: string;

  @Field({ description: 'feedback.' })
  @Column({ name: 'feedback' })
  feedback: string;

  @Field({ description: 'values.' })
  @Column({ name: 'values' })
  values!: string;

  @Field({ description: 'Creation timestamp of the game.' })
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @Field({ description: 'Last updated timestamp of the game.' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
