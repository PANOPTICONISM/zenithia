import express from 'express';
import pkg from 'body-parser';
const app = express();
const port = 4000;
import { deleteProject, getProjects, postProject, updateProjects } from './projects.js';

const { json, urlencoded } = pkg;

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.get('/api', (req, res) => {
  const path = `/api/projects`;
  //set header first to allow request or origin domain (value can be different)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

//---- other code

//Preflight CORS handler
  if(req.method === 'OPTIONS') {
      return res.status(200).json(({
          body: "OK"
      }))
  }

  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
})

app.get('/api/projects', getProjects);
app.put('/api/projects/:id', updateProjects);
app.delete('/api/projects/:id', deleteProject);
app.post('/api/projects', postProject);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

export default app;