import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsDateString, IsNotEmpty, IsString, Length, MinDate } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    type: String,
    description: 'Task title.',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  title: string;

  @ApiProperty({
    type: String,
    description: 'Task description.',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 200)
  description: string;

  @ApiProperty({
    type: Date,
    description: 'Task date.',
  })
  @Transform( ({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  @IsNotEmpty()
  date: Date;
}
