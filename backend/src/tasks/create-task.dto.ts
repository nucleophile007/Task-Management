/* eslint-disable prettier/prettier */
import { IsEnum,IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
export class CreateTaskDto {
  @ApiProperty({ description: 'Title of the task' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Description of the task' })
  @IsNotEmpty()
  description: string;

   @ApiProperty({ description: 'Status of the task', enum: TaskStatus })
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
  }

