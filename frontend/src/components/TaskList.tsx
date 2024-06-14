import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, updateTask } from '../features/tasks/tasksActions';
import { RootState, AppDispatch } from '../store';
import styled from 'styled-components';

const ListContainer = styled.div`
  width: 90%;
  max-width: 500px;
  margin-bottom: 20px;
`;

const ListItem = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #ff0000;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;

const EditButton = styled(Button)`
  background-color: #007bff;

  &:hover {
    background-color: #0056b3;
  }
`;

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task: any) => {
    const description = prompt("Update Task Description:", task.description);
    const time = prompt("Update Task Time:", task.time);
    const recurring = window.confirm("Is this task recurring?");
    if (description && time) {
      dispatch(updateTask({ id: task.id, description, time, recurring }));
    }
  };

  return (
    <ListContainer>
      <h2>Scheduled Tasks</h2>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <p>Description: {task.description}</p>
          <p>Time: {new Date(task.time).toLocaleString()}</p>
          <p>Recurring: {task.recurring ? 'Yes' : 'No'}</p>
          <ButtonContainer>
            <EditButton onClick={() => handleEdit(task)}>Edit</EditButton>
            <Button onClick={() => handleDelete(task.id)}>Delete</Button>
          </ButtonContainer>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default TaskList;
