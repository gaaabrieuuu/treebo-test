import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Task } from './entities/task.entity';

@ApiTags('Task')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiBody({ type: CreateTaskDto })
  @ApiCreatedResponse({
    description: 'Task created successfully.',
    example: {
      message: 'Task created successfully',
      data: {},
      status: 201,
    },
  })
  @ApiBadRequestResponse({
    description: 'Error creating the task.',
    example: {
      message: 'Error creating the task',
      data: {},
      status: 400,
    },
  })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiFoundResponse({
    type: Task,
    isArray: true,
    description: 'Returns an array of tasks.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiFoundResponse({ description: 'Returns a task.', type: Task })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateTaskDto })
  @ApiOkResponse({
    description: 'Task updated successfully',
    example: {
      message: 'Task updated successfully',
      data: {},
      status: 200,
    },
    type: UpdateTaskDto,
  })
  @ApiBadRequestResponse({
    description: 'Error updating task.',
    example: {
      message: 'Error updating task',
      data: {},
      status: 400,
    },
  })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Task deleted successfully.',
    example: {
      message: 'Task deleted successfully',
      id: 'ec04c6cc-ba1e-4135-b582-9f7fc0771e14',
      status: 200,
    },
  })
  @ApiBadRequestResponse({
    description: 'Error deleting task.',
    example: {
      message: 'Error deleting task',
      status: 400,
    },
  })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
