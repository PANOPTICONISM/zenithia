import { userToken } from "./middleware/auth.js";
import { connection } from "./middleware/mysql.js";

export const getTimeTracker = async (req, res) => {
  const sqlSearch = `SELECT BIN_TO_UUID(id) as id, date, total, start_time, finish_time, project_id orderBy FROM timetracker where user_id = UUID_TO_BIN('${userToken.id}')`;

  try {
    const [rows] = await connection.execute(sqlSearch);
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving your columns." });
  }
};

export const postTimeTracker = async (req, res) => {
  const { body } = req;
  const sqlInsert = `INSERT INTO timetracker(id, date, total, start_time, finish_time, project_id, user_id) VALUES (UUID_TO_BIN(?),?,?,?,?, UUID_TO_BIN(?), UUID_TO_BIN('${userToken.id}'))`;

  try {
    await connection.execute(sqlInsert, Object.values(body));
    return res.status(200).send(`Timer added successfully.`);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while adding your time tracker." });
  }
};

export const updateTimeTracker = async (req, res) => {
  const { body, params } = req;
  const values = Object.values(body);
  const sqlUpdate = `UPDATE timetracker SET date=?, total=?, start_time=?, finish_time=?, project_id=UUID_TO_BIN(?)
  WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await connection.execute(sqlUpdate, values);
    return res.status(200).send(`Task with id: ${params.id} has been updated.`);
  } catch (error) {
    console.log(error, body)
    return res
      .status(500)
      .json({ error: "An error occurred while updating your task." });
  }
};

export const deleteTimeTracker = async (req, res) => {
  const { params } = req;
  const sqlDelete = `DELETE FROM tasks WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await connection.execute(sqlDelete);
    return res.status(200).send(`Task with id: ${params.id} has been deleted.`);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting your task." });
  }
};