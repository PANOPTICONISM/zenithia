import express from 'express';
import pkg from 'body-parser';
const app = express();
const port = 4000;
import { getProjects } from './endpoints/projects.js';

const { json, urlencoded } = pkg;

app.use(json())
app.use(
  urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js' })
})

app.get('/projects', getProjects);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})