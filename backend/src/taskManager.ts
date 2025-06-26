import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  description: string;
  time: string;
  recurring: boolean;
}

export class TaskManager {
  private tasks: Task[] = [];
  private logs: string[] = [];
  private logs2: string[] = [];

  addTask(description: string, time: string, recurring: boolean): Task {
    const task: Task = { id: uuidv4(), description, time, recurring };
    this.tasks.push(task);
    this.scheduleTask(task);
    return task;
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getLogs(): string[] {
    return this.logs;
  }

  updateTask(id: string, description: string, time: string, recurring: boolean): Task | null {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      const updatedTask = { ...this.tasks[taskIndex], description, time, recurring };
      this.tasks[taskIndex] = updatedTask;
      return updatedTask;
    }
    return null;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  private scheduleTask(task: Task) {
    const delay = new Date(task.time).getTime() - new Date().getTime();
    setTimeout(() => {
      this.logs.push(`Executed task: ${task.description} at ${new Date().toISOString()}`);
      if (task.recurring) {
        this.scheduleTask(task);
      }
    }, delay);
  }
}
