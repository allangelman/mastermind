import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: process.env.NODE_ENV === 'development',
      // playground: process.env.NODE_ENV === 'development',
      debug: true,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cekc3nhgp3jlcskjun4g-a',
      port: 5432,
      username: 'mastermind_db_user',
      password: 'AKRDxJGQUWJBm268Ht2uHGQ65nQOxjhO',
      database: 'mastermind_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    PlayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
