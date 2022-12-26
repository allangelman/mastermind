import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { ID } from '@nestjs/graphql/dist/scalars';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { Column } from 'typeorm/decorator/columns/Column';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';

@ObjectType({ description: 'Represents information about a player.' })
@Entity('notes')
export class Player {
  @Field(() => ID, { description: 'ID of the player.' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field({ description: 'name of the player.' })
  @Column({ name: 'name', type: 'string' })
  name!: string;

  @Field({ description: 'Creation timestamp of the note.' })
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @Field({ description: 'Last updated timestamp of the note.' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
