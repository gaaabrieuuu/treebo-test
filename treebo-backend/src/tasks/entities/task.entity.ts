import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  @ApiProperty({
    type: String,
    description: 'Auto-generated UUID.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    description: 'Task title',
  })
  @Column()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Text description.',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    type: Date,
    description: 'Text date.',
  })
  @Column('datetime')
  date: Date;

  @ApiProperty({
    type: Boolean,
    default: false,
    description: 'Task status with false value as default.',
  })
  @Column({ default: false })
  status: boolean;
}
