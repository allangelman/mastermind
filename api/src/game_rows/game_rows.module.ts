import { Module } from '@nestjs/common';
import { GameRowsService } from './game_rows.service';
import { GameRowsResolver } from './game_rows.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameRow } from './entities/game_row.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameRow])],
  providers: [GameRowsResolver, GameRowsService],
  exports: [GameRowsService],
})
export class GameRowsModule {}
