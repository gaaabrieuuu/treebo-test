import { CreateTaskDto } from './create-task.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Task status.',
    default: false,
  })
  status: boolean;
}
