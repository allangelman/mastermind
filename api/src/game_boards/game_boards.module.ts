import { Module } from '@nestjs/common';
import { GameBoardsService } from './game_boards.service';
import { GameBoardsResolver } from './game_boards.resolver';
import { GameBoard } from './entities/game_board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameRowsModule } from 'src/game_rows/game_rows.module';

@Module({
  imports: [TypeOrmModule.forFeature([GameBoard]), GameRowsModule],
  providers: [GameBoardsResolver, GameBoardsService],
  exports: [GameBoardsService],
})
export class GameBoardsModule {}
