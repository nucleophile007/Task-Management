import axios, { AxiosResponse } from 'axios';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';

class TaskService {
  private static async handleResponse<T>(response: Promise<AxiosResponse<T>>): Promise<T> {
    try {
      const result = await response;
      console.log(result.data);
  
      // Normalize _id -> id for frontend use
      if (Array.isArray(result.data)) {
        return result.data.map((task: any) => ({ ...task, id: task._id })) as T;
      } else if (result.data && typeof result.data === "object" && "_id" in result.data) {
        return { ...result.data, id: result.data._id } as T;
      }
  
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Error: ${error.response.status} - ${error.response.data}`);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
  

  static async getTasks(): Promise<Task[]> {
    return this.handleResponse<Task[]>(axios.get(`${API_BASE_URL}/tasks`));
  }

  static async getTaskById(_id: string): Promise<Task> {
    return this.handleResponse<Task>(axios.get(`${API_BASE_URL}/tasks/${_id}`));
  }

  static async createTask(task: Partial<Task>): Promise<void> {
    await this.handleResponse<void>(axios.post(`${API_BASE_URL}/tasks`, task));
  }

  static async deleteTask(_id: string): Promise<void> {
    console.log(_id);
    await this.handleResponse<void>(axios.delete(`${API_BASE_URL}/tasks/${_id}`));
  }

  static async updateTask(_id: string, task: Partial<Task>): Promise<void> {
    //console.log("Updating Task ID:", _id); // Debugging
    //console.log("Updated Task Data:", task);
    await this.handleResponse<void>(axios.patch(`${API_BASE_URL}/tasks/${_id}`, task));
  }
}

export default TaskService;
