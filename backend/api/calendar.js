import { userToken } from "./middleware/auth.js";
import { connection } from "./middleware/mysql.js";

export const getCalendar = async (req, res) => {
  const sqlSearch = "SELECT * FROM calendars WHERE user_id = ?";

  try {
    const [rows] = await connection.execute(sqlSearch, [userToken.id]);
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving your data." });
  }
};

export const updateCalendar = async (req, res) => {
  const { body, params } = req;
  const sqlUpdate = "UPDATE calendars SET title=?, start=?, end=? WHERE id = ?";

  try {
    await connection.execute(sqlUpdate, [...Object.values(body), params.id]);
    return res.status(200).send(`Calendar with id: ${params.id} has been modified`);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while updating your entry." });
  }
};

export const deleteCalendar = async (req, res) => {
  const { params } = req;
  const sqlDelete = "DELETE FROM calendars WHERE id = ?";

  try {
    await connection.execute(sqlDelete, [params.id]);
    return res.status(200).send(`Calendar entry with id: ${params.id} has been deleted.`);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting your event." });
  }
};

export const postCalendar = async (req, res) => {
  const { body } = req;
  const sqlInsert = `INSERT INTO calendars (title, start, end, user_id) VALUES (?,?,?,UUID_TO_BIN('${userToken.id}'))`;

  try {
    await connection.execute(sqlInsert, Object.values(body));
    return res.status(200).send(`Calendar event added successfully.`);
  } catch (error) {
    console.log(error, '404')
    return res.status(500).json({ error: "An error occurred while adding your event." });
  }
};