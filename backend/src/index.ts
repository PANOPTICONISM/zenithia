import dotenv from "dotenv";
dotenv.config();

import type { Request, Response } from "express";
import express from "express";
import helmet from "helmet";
import {
  deleteCalendar,
  getCalendar,
  postCalendar,
  updateCalendar,
} from "./calendar";
import { deleteClient, getClients, postClient, updateClient } from "./clients";
import { login } from "./login";
import { auth } from "./middleware/auth";
import corsMiddleware from "./middleware/cors";
import { apiLimiter, authLimiter } from "./middleware/rateLimiter";
import sequelize from "./middleware/sequelize";
import {
  deleteProject,
  getProjects,
  postProject,
  updateProjects,
} from "./projects";
import { signUp } from "./signUp";
import { deleteTask, getTasks, postTask, updateTask } from "./tasks";
import {
  deleteTimeTracker,
  getTimeTracker,
  postTimeTracker,
  updateTimeTracker,
} from "./timetracker";

const app = express();
const port = process.env.PORT || 4000;

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.use(helmet());

app.use(corsMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
    await sequelize.sync();
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

initializeDatabase();

app.use("/api", apiLimiter);

app.post("/api/signup", authLimiter, signUp);
app.post("/api/login", authLimiter, login);

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
