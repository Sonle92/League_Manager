// todos.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodosService } from './todolist.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getAllTodos(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Todo[]> {
    return this.todosService.getAllTodos(page, limit);
  }

  @Get(':id')
  async getTodoById(@Param('id') id: number): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Post()
  async createTodo(@Body() todo: Todo): Promise<Todo> {
    return this.todosService.create(todo);
  }

  @Put(':id')
  async updateTodo(@Param('id') id: number, @Body() todo: Todo): Promise<void> {
    return this.todosService.update(id, todo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number): Promise<void> {
    return this.todosService.deleteTodo(id);
  }
}
