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
        status: 400,
      };
    });
  }

  async findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: string) {
    return this.taskRepository.findOneBy({ id: id });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update({ id: id }, updateTaskDto)
    .then(() => {
      return {
        message: 'Task updated successfully',
        data: updateTaskDto,
        status: 200,
      };
    })
    .catch((e:any) => {
      console.error(e)
      return {
        message: 'Error updating task',
        data: {},
        status: 400,
      };
    });
  }

  async remove(id: string) {
    return await this.taskRepository.delete({ id: id })
    .then(() => {
      return {
        message: 'Task deleted successfully',
        id: id,
        status: 200,
      };
    })
    .catch(() => {
      return {
        message: 'Error deleting task',
        status: 400,
      };
    });;
  }
}
