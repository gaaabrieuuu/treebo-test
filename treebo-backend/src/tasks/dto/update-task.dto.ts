import { IsBoolean, IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Task status.',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  status: boolean;
}
