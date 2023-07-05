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
import { rateLimiter } from "./middleware/rateLimiter.js";

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

app.use(rateLimiter);

app.get("/", auth, (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end("You have the correct credentials.");
});

app.get("/api/projects", auth, getProjects);
app.put("/api/projects/:id", auth, updateProjects);
app.delete("/api/projects/:id", auth, deleteProject);
app.post("/api/projects", auth, postProject);

app.get("/api/tasks", auth, getTasksColumns);
app.get("/api/tasks/all", auth, getTasks);
app.post("/api/tasks/all", auth, postTask);
app.put("/api/tasks/all/:id", auth, updateTask);
app.delete("/api/tasks/all/:id", auth, deleteTask);

app.get("/api/timetracker", auth, getTimeTracker);
app.post("/api/timetracker", auth, postTimeTracker);
app.put("/api/timetracker/:id", auth, updateTimeTracker);
app.delete("/api/timetracker/:id", auth, deleteTimeTracker);

app.get("/api/clients", auth, getClients);
app.put("/api/clients/:id", auth, updateClient);
app.delete("/api/clients/:id", auth, deleteClient);
app.post("/api/clients", auth, postClient);

app.get("/api/calendar", auth, getCalendar);
app.put("/api/calendar/:id", auth, updateCalendar);
app.delete("/api/calendar/:id", auth, deleteCalendar);
app.post("/api/calendar", auth, postCalendar);

app.post('/api/login', processUserDetails);
app.post('/api/signup', signUp);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

export default app;