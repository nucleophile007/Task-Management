import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TasksService } from './tasks.service';
import { Task, TaskDocument, TaskStatus } from './task.schema';

describe('TasksService', () => {
  let service: TasksService;
  let taskModel: Model<TaskDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name), // ✅ Correct way to provide Mongoose Model
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    taskModel = module.get<Model<TaskDocument>>(getModelToken(Task.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new task', async () => {
    const createTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
    };

    const savedTask = {
      _id: '12345',
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.PENDING,
    };

    (taskModel.create as jest.Mock).mockResolvedValue(savedTask);

    const result = await service.createTask(createTaskDto.title, createTaskDto.description);
    expect(result).toEqual(savedTask);
    expect(taskModel.create).toHaveBeenCalledWith({
      title: createTaskDto.title,
      description: createTaskDto.description,
    });
  });
});
