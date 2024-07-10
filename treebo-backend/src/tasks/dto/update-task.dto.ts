import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @ApiProperty()
    @Column()
    status: boolean;
}
