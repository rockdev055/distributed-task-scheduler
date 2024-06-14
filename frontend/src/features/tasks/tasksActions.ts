import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export interface Task {
  id: string;
  description: string;
  time: string;
  recurring: boolean;
}

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async ({ description, time, recurring }: Omit<Task, 'id'>) => {
    const response = await axios.post('/tasks', { description, time, recurring });
    return response.data;
  }
);

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await axios.get('/tasks');
    return response.data;
  }
);

export const fetchLogs = createAsyncThunk(
  'tasks/fetchLogs',
  async () => {
    const response = await axios.get('/tasks/logs');
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, description, time, recurring }: Task) => {
    const response = await axios.put(`/tasks/${id}`, { description, time, recurring });
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string) => {
    await axios.delete(`/tasks/${id}`);
    return id;
  }
);
