import express from 'express';
import pkg from 'body-parser';
const app = express();
const port = 4000;
import { deleteProject, getProjects, postProject, updateProjects } from './projects.js';
import cors from 'cors';

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true
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
  res.end(`Hello!`);
})

app.get('/api/projects', getProjects);
app.put('/api/projects/:id', updateProjects);
app.delete('/api/projects/:id', deleteProject);
app.post('/api/projects', postProject);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

export default app;