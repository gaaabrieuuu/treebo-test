import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(createTaskDto);
  }

  async findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: number) {
    return this.taskRepository.findOneBy({ id: id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update({ id: id }, updateTaskDto);
  }

  async remove(id: number) {
    return this.taskRepository.delete({ id: id });
  }
}
