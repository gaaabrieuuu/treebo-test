import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CreateTaskDto {
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

  get() {
    return {
      title: this.title,
      description: this.description,
      date: this.date,
      status: this.status ? this.status : false,
    };
  }
}
