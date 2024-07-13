import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    type: String,
    description: 'Task title.',
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Task description.',
  })
  description: string;

  @ApiProperty({
    type: Date,
    description: 'Task date.',
  })
  date: Date;
}
