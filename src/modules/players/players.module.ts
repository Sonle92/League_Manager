import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/players.entity';
import { PlayerController } from './http/controllers/players.controller';
import { PlayerService } from './players.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
