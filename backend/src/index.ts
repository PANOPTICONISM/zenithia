import pkg from "body-parser";
import cors from "cors";
import type { Request, Response } from "express";
import express from "express";
import {
  deleteCalendar,
  getCalendar,
  postCalendar,
  updateCalendar,
} from "./calendar";
import { deleteClient, getClients, postClient, updateClient } from "./clients";
import { signUp } from "./createUser";
import { login } from "./login";
import { auth } from "./middleware/auth";
import sequelize from "./middleware/sequelize";
import {
  deleteProject,
  getProjects,
  postProject,
  updateProjects,
} from "./projects";
import { deleteTask, getTasks, postTask, updateTask } from "./tasks";
import {
  deleteTimeTracker,
  getTimeTracker,
  postTimeTracker,
  updateTimeTracker,
} from "./timetracker";

const app = express();
const port = 4000;
const { json, urlencoded } = pkg;

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"];

interface CorsOptions {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) => void;
}

const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) {
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

(async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      sequelize.sync();
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });
})();

app.get("/", auth, async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end("You have the correct credentials.");
});

app.post("/api/signup", signUp);
app.post("/api/login", login);

app.get("/api/projects", auth, getProjects);
app.put("/api/projects/:id", auth, updateProjects);
app.delete("/api/projects/:id", auth, deleteProject);
app.post("/api/projects", auth, postProject);

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

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

export default app;
