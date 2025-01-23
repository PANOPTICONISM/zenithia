import type { Request, Response } from 'express';
import { userToken } from "./middleware/auth.ts";
import { connection } from "./middleware/mysql.ts";

export const getCalendar = async (req: Request, res: Response): Promise<void> => {
  const sqlSearch = `SELECT BIN_TO_UUID(id) as id, title, start, end, created_at 
  FROM calendars WHERE user_id = UUID_TO_BIN('${userToken.id}')`;

  try {
    const [rows] = await connection.execute(sqlSearch);
    res.status(200).json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving your data." });
  }
};

export const updateCalendar = async (req: Request, res: Response): Promise<void> => {
  const { body, params } = req;
  const sqlUpdate = `UPDATE calendars SET title=?, start=?, end=? WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await connection.execute(sqlUpdate, Object.values(body));
    res.status(200).send(`Calendar with id: ${params.id} has been modified`);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating your entry." });
  }
};

export const deleteCalendar = async (req: Request, res: Response): Promise<void> => {
  const { params } = req;
  const sqlDelete = `DELETE FROM calendars WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await connection.execute(sqlDelete);
    res.status(200).send(`Calendar entry with id: ${params.id} has been deleted.`);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting your event." });
  }
};

export const postCalendar = async (req: Request, res: Response): Promise<void> => {
  const { body } = req;
  const sqlInsert = `INSERT INTO calendars (title, start, end, user_id) VALUES (?,?,?,UUID_TO_BIN('${userToken.id}'))`;

  try {
    await connection.execute(sqlInsert, Object.values(body));
    res.status(200).send(`Calendar event added successfully.`);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding your event." });
  }
};