import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addTask } from '../features/tasks/tasksActions';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 500px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 8px;
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Label = styled.label`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const TaskForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [recurring, setRecurring] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTask({ description, time, recurring }));
    setDescription('');
    setTime('');
    setRecurring(false);
  };

  return (
    <FormContainer>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          required
        />
        <Input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <Label>
          <Checkbox
            type="checkbox"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
          />
          Recurring
        </Label>
        <Button type="submit">Add Task</Button>
      </form>
    </FormContainer>
  );
};

export default TaskForm;
