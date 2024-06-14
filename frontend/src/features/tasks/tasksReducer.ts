import { createReducer, isAnyOf } from '@reduxjs/toolkit';
import { addTask, fetchTasks, fetchLogs, updateTask, deleteTask } from './tasksActions';

interface Task {
  id: string;
  description: string;
  time: string;
  recurring: boolean;
}

interface TasksState {
  tasks: Task[];
  logs: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  logs: [],
  status: 'idle',
  error: null,
};

const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
      state.status = 'succeeded';
    })
    .addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.status = 'succeeded';
    })
    .addCase(fetchLogs.fulfilled, (state, action) => {
      state.logs = action.payload;
      state.status = 'succeeded';
    })
    .addCase(updateTask.fulfilled, (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      state.status = 'succeeded';
    })
    .addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.status = 'succeeded';
    })
    .addMatcher(isAnyOf(addTask.pending, fetchTasks.pending, fetchLogs.pending, updateTask.pending, deleteTask.pending), (state) => {
      state.status = 'loading';
    })
    .addMatcher(isAnyOf(addTask.rejected, fetchTasks.rejected, fetchLogs.rejected, updateTask.rejected, deleteTask.rejected), (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || null;
    });
});

export default tasksReducer;
