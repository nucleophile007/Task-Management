import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './update-task.dto';
import { CreateTaskDto } from './create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    console.log("Received Data:", createTaskDto); // Logs full object
    return this.tasksService.createTask(createTaskDto);

  }

  @Get()
  async getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
      console.log("Received ID:", id);
      console.log("Received Data:", updateTaskDto); // Logs full object
  
      return this.tasksService.updateTask(id, updateTaskDto);
  }
  

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
