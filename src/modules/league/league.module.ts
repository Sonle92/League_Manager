import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { LeagueController } from './http/controllers/league.controller';
import { LeagueService } from './league.service';
import { AppModule } from 'src/app.module';

@Module({
  imports: [TypeOrmModule.forFeature([League]), forwardRef(() => AppModule)],
  controllers: [LeagueController],
  providers: [LeagueService],
  exports: [LeagueService],
})
export class LeagueModule {}
