import { Module } from '@nestjs/common';
import { GameBoardsService } from './game_boards.service';
import { GameBoardsResolver } from './game_boards.resolver';
import { GameBoard } from './entities/game_board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GameBoard])],
  providers: [GameBoardsResolver, GameBoardsService],
  exports: [GameBoardsService],
})
export class GameBoardsModule {}
