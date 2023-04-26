import express from 'express';
import pkg from 'body-parser';
import { deleteProject, getProjects, postProject, updateProjects } from './projects.js';
import cors from 'cors';
import { deleteTask, getTasks, getTasksColumns, postTask, updateTask } from './tasks.js';
import { deleteTimeTracker, getTimeTracker, postTimeTracker, updateTimeTracker } from './timetracker.js';

const app = express();
const port = 4000;
const { json, urlencoded } = pkg;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
}

app.use(cors(corsOptions));

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  const path = `/api/projects`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to: <a href="${path}">${path}</a>`);
})

app.get('/api/projects', getProjects);
app.put('/api/projects/:id', updateProjects);
app.delete('/api/projects/:id', deleteProject);
app.post('/api/projects', postProject);

app.get('/api/tasks', getTasksColumns);
app.get('/api/tasks/all', getTasks);
app.post('/api/tasks/all', postTask);
app.put('/api/tasks/all/:id', updateTask);
app.delete('/api/tasks/all/:id', deleteTask);

app.get('/api/timetracker', getTimeTracker);
app.post('/api/timetracker', postTimeTracker);
app.put('/api/timetracker/:id', updateTimeTracker);
app.delete('/api/timetracker/:id', deleteTimeTracker);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

export default app;