import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty()
    @Column({ length: 500 })
    title: string;
  
    @ApiProperty()
    @Column('text')
    description: string;
  
    @ApiProperty()
    @Column('datetime')
    date: Date;
  
    @ApiProperty()
    @Column()
    status: boolean;
}
