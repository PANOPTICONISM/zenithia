import express from 'express';
import pkg from 'body-parser';
const app = express();
const port = 4000;
import { getProjects, updateProjects } from './endpoints/projects.js';

const { json, urlencoded } = pkg;

app.use(json())
app.use(
  urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  const path = `/api/projects`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to: <a href="${path}">${path}</a>`);
})

app.get('/api/projects', getProjects);
app.put('/api/projects/:id', updateProjects);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

export default app;