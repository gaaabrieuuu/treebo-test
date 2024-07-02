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
    return await this.taskRepository.save(createTaskDto)
    .then(() => {
      return {
        message: 'Task created successfully',
        data: createTaskDto,
        status: 201,
      };
    })
    .catch(() => {
      return {
        message: 'Error creating the task',
        data: {},
        status: 500,
      };
    });
  }

  async findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: number) {
    return this.taskRepository.findOneBy({ id: id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update({ id: id }, updateTaskDto)
    .then(() => {
      return {
        message: 'Task updated successfully',
        data: updateTaskDto,
        status: 201,
      };
    })
    .catch(() => {
      return {
        message: 'Error updating task',
        data: {},
        status: 500,
      };
    });
  }

  async remove(id: number) {
    return await this.taskRepository.delete({ id: id })
    .then(() => {
      return {
        message: 'Task deleted successfully',
        id: id,
        status: 201,
      };
    })
    .catch(() => {
      return {
        message: 'Error deleting task',
        status: 500,
      };
    });;
  }
}
