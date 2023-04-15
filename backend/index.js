import express from 'express';
import pkg from 'body-parser';
const app = express();
const port = 4000;
import { deleteProject, getProjects, postProject, updateProjects } from './endpoints/projects.js';
import cors from 'cors';

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

const { json, urlencoded } = pkg;

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

app.get('/api/projects', cors(), getProjects);
app.put('/api/projects/:id', updateProjects);
app.delete('/api/projects/:id', deleteProject);
app.post('/api/projects', postProject);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

export default app;