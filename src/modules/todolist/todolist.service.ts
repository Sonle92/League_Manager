// todos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  findOne(id: number): Promise<Todo | null> {
    return this.todoRepository.findOneBy({ id });
  }
  create(todo: Todo): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  async update(id: number, todo: Todo): Promise<void> {
    await this.todoRepository.update(id, todo);
  }

  async deleteTodo(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
  async getAllTodos(page = 1, limit = 10): Promise<Todo[]> {
    const skip = (page - 1) * limit;
    return this.todoRepository.find({ skip, take: limit });
  }

  async getTotalTodosCount(): Promise<number> {
    return this.todoRepository.count();
  }
}
