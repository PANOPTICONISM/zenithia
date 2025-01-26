import type { Request, Response } from 'express';
import { userToken } from "./middleware/auth";
import { connection } from "./middleware/mysql";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const sqlSearch = `SELECT BIN_TO_UUID(a.id) as id, a.title, a.importance, a.deadline, BIN_TO_UUID(a.table_id) as table_id, BIN_TO_UUID(a.project_id) as project_id, a.created_at, 
  JSON_OBJECT('id', BIN_TO_UUID(b.id), 'title', b.title) as projects
  FROM tasks a LEFT JOIN projects b ON a.project_id=b.id WHERE a.user_id = UUID_TO_BIN('${userToken.id}')`;

  try {
    const [rows] = await connection.execute(sqlSearch);
    res.status(200).json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving your tasks." });
  }
};

export const postTask = async (req: Request, res: Response): Promise<void> => {
  const { body } = req;
  const sqlInsert = `INSERT INTO tasks(id, title, importance, deadline, table_id, project_id, user_id) VALUES (UUID_TO_BIN(?),?,?,?, UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN('${userToken.id}'))`;

  try {
    await connection.execute(sqlInsert, Object.values(body));
    res.status(200).send(`Task added successfully.`);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding your task." });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { body, params } = req;
  const values = Object.values(body);
  const sqlUpdate = `UPDATE tasks SET ${values.length > 1 ? "title=?, importance=?, deadline=?, table_id=UUID_TO_BIN(?), project_id=UUID_TO_BIN(?)" : "table_id=UUID_TO_BIN(?)"}
  WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await connection.execute(sqlUpdate, values);
    res.status(200).send(`Task with id: ${params.id} has been updated.`);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating your task." });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { params } = req;
  const sqlDelete = `DELETE FROM tasks WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await connection.execute(sqlDelete);
    res.status(200).send(`Task with id: ${params.id} has been deleted.`);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting your task." });
  }
};