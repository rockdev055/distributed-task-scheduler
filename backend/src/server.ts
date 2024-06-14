import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import tasksRouter from './routes/tasks';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use('/tasks', tasksRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
