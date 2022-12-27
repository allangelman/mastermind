import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { Game } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GamesResolver, GamesService],
  exports: [GamesService],
})
export class GamesModule {}
