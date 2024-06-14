import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogs } from '../features/tasks/tasksActions';
import { RootState, AppDispatch } from '../store';
import styled from 'styled-components';

const ListContainer = styled.div`
  width: 90%;
  max-width: 500px;
`;

const ListItem = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const LogList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const logs = useSelector((state: RootState) => state.tasks.logs);

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  return (
    <ListContainer>
      <h2>Execution Logs</h2>
      {logs.map((log, index) => (
        <ListItem key={index}>
          <p>{log}</p>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default LogList;
