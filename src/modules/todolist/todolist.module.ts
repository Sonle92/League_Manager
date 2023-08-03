import { Module } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todolist.controller';
import { TodosService } from './todolist.service';
@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodoModule {}
