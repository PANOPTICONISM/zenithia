import { userToken } from "./middleware/auth.js";
import { connection } from "./middleware/mysql.js";

export const getTimeTracker = async (req, res) => {
  const sqlSearch = `SELECT BIN_TO_UUID(a.id) as id, a.date, a.total, a.start_time, a.finish_time, BIN_TO_UUID(a.project_id) as project_id, 
  JSON_OBJECT('id', BIN_TO_UUID(b.id), 'title', b.title) as projects FROM timetracker a 
  LEFT JOIN projects b ON a.project_id=b.id 
  where a.user_id = UUID_TO_BIN('${userToken.id}')`;

  try {
    const [rows] = await connection.execute(sqlSearch);
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving your time tracker data." });
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
  const sqlUpdate = `UPDATE timetracker SET ${values.length > 2 ? 'date=?, start_time=?, finish_time=?, project_id=UUID_TO_BIN(?)' : 'finish_time=?, total=?' }
  WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await connection.execute(sqlUpdate, values);
    return res.status(200).send(`Entry with id: ${params.id} has been updated.`);
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: "An error occurred while updating your entry." });
  }
};

export const deleteTimeTracker = async (req, res) => {
  const { params } = req;
  const sqlDelete = `DELETE FROM timetracker WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await connection.execute(sqlDelete);
    return res.status(200).send(`Entry with id: ${params.id} has been deleted.`);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting your entry." });
  }
};