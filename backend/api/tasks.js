import { userToken } from "./middleware/auth.js";
import { connection } from "./middleware/mysql.js";

export const getTasksColumns = async (req, res) => {
  const sqlSearch = "SELECT BIN_TO_UUID(id) as id, title, orderBy FROM columns";

  try {
    const [rows] = await connection.execute(sqlSearch);
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving your columns." });
  }
};

export const getTasks = async (req, res) => {
  const sqlSearch = `SELECT BIN_TO_UUID(id) as id, title, importance, deadline, BIN_TO_UUID(table_id) as table_id, BIN_TO_UUID(project_id) as project_id, created_at
  FROM tasks WHERE user_id = UUID_TO_BIN('${userToken.id}')`;

  try {
    const [rows] = await connection.execute(sqlSearch);
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving your tasks." });
  }
};

export const postTask = async (req, res) => {
  const { body } = req;
  const sqlInsert = `INSERT INTO tasks(id, title, importance, deadline, table_id, project_id, user_id) VALUES (UUID_TO_BIN(?),?,?,?, UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN('${userToken.id}'))`;

  try {
    await connection.execute(sqlInsert, Object.values(body));
    return res.status(200).send(`Task added successfully.`);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while adding your task." });
  }
};

export const updateTask = async (req, res) => {
  const { body, params } = req;
  const sqlUpdate = `UPDATE tasks SET title=?, importance=?, deadline=?, table_id=UUID_TO_BIN(?), project_id=UUID_TO_BIN(?)
  WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await connection.execute(sqlUpdate, Object.values(body));
    return res.status(200).send(`Project with id: ${params.id} has been updated.`);
  } catch (error) {
    console.log(error, body)
    return res
      .status(500)
      .json({ error: "An error occurred while updating your project." });
  }
};

export const deleteTask = async (req, res) => {
  const { params } = req;
  const sqlDelete = `DELETE FROM tasks WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await connection.execute(sqlDelete);
    return res.status(200).send(`Project with id: ${params.id} has been deleted.`);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting your project." });
  }
};