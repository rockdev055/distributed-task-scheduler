import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import LogList from './components/LogList';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-sizing: border-box;
`;

function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <h1>Distributed Task Scheduler</h1>
        <TaskForm />
        <TaskList />
        <LogList />
      </AppContainer>
    </Provider>
  );
}

export default App;
