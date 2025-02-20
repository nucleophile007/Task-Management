import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { UpdateTaskDto } from './update-task.dto';


@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(title: string, description: string): Promise<Task> {
    return this.taskModel.create({ title, description });
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getTaskById(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel
        .findByIdAndUpdate(id, updateTaskDto, { new: true, runValidators: true })
        .exec();
}


  async deleteTask(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
