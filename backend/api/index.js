import express from 'express';
import pkg from 'body-parser';
import { deleteProject, getProjects, postProject, updateProjects } from './projects.js';
import cors from 'cors';
import { deleteTask, getTasks, getTasksColumns, postTask, updateTask } from './tasks.js';
import { deleteTimeTracker, getTimeTracker, postTimeTracker, updateTimeTracker } from './timetracker.js';
import { deleteClient, getClients, postClient, updateClient } from './clients.js';
import { deleteCalendar, getCalendar, postCalendar, updateCalendar } from './calendar.js';
import { processUserDetails } from './login.js';
import { signUp } from './signup.js';
import { auth } from "./middleware/auth.js";

const app = express();
const port = 4000;
const { json, urlencoded } = pkg;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
};

app.use(cors(corsOptions));

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.get("/", auth, (req, res) => {
  const path = `/api/projects`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to: <a href="${path}">${path}</a>`);
});

app.get("/api/projects", getProjects);
app.put("/api/projects/:id", updateProjects);
app.delete("/api/projects/:id", deleteProject);
app.post("/api/projects", postProject);

app.get("/api/tasks", getTasksColumns);
app.get("/api/tasks/all", getTasks);
app.post("/api/tasks/all", postTask);
app.put("/api/tasks/all/:id", updateTask);
app.delete("/api/tasks/all/:id", deleteTask);

app.get("/api/timetracker", getTimeTracker);
app.post("/api/timetracker", postTimeTracker);
app.put("/api/timetracker/:id", updateTimeTracker);
app.delete("/api/timetracker/:id", deleteTimeTracker);

app.get("/api/clients", auth, getClients);
app.put('/api/clients/:id', updateClient);
app.delete('/api/clients/:id', deleteClient);
app.post('/api/clients', postClient);

app.get('/api/calendar', getCalendar);
app.put('/api/calendar/:id', updateCalendar);
app.delete('/api/calendar/:id', deleteCalendar);
app.post('/api/calendar', postCalendar);

app.post('/api/login', processUserDetails);
app.post('/api/signup', signUp);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

export default app;