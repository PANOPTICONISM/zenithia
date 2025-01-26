import type { Request, Response } from 'express';
import { userToken } from "./middleware/auth";
import { database } from './middleware/mysql';

export const getTimeTracker = async (req: Request, res: Response): Promise<void> => {
  const sqlSearch = `SELECT BIN_TO_UUID(a.id) as id, a.date, a.total, a.start_time, a.finish_time, BIN_TO_UUID(a.project_id) as project_id, 
  JSON_OBJECT('id', BIN_TO_UUID(b.id), 'title', b.title) as projects FROM timetracker a 
  LEFT JOIN projects b ON a.project_id=b.id 
  where a.user_id = UUID_TO_BIN('${userToken.id}')`;

  try {
    const [rows] = await database.execute(sqlSearch);
    res.status(200).json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving your time tracker data." });
  }
};

export const postTimeTracker = async (req: Request, res: Response): Promise<void> => {
  const { body } = req;
  const sqlInsert = `INSERT INTO timetracker(id, date, total, start_time, finish_time, project_id, user_id) VALUES (UUID_TO_BIN(?),?,?,?,?, UUID_TO_BIN(?), UUID_TO_BIN('${userToken.id}'))`;

  try {
    await database.execute(sqlInsert, Object.values(body));
    res.status(200).send(`Timer added successfully.`);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding your time tracker." });
  }
};

export const updateTimeTracker = async (req: Request, res: Response): Promise<void> => {
  const { body, params } = req;
  const values = Object.values(body);
  const sqlUpdate = `UPDATE timetracker SET ${values.length > 2 ? 'date=?, start_time=?, finish_time=?, project_id=UUID_TO_BIN(?)' : 'finish_time=?, total=?'}
  WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await database.execute(sqlUpdate, values);
    res.status(200).send(`Entry with id: ${params.id} has been updated.`);
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: "An error occurred while updating your entry." });
  }
};

export const deleteTimeTracker = async (req: Request, res: Response): Promise<void> => {
  const { params } = req;
  const sqlDelete = `DELETE FROM timetracker WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await database.execute(sqlDelete);
    res.status(200).send(`Entry with id: ${params.id} has been deleted.`);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting your entry." });
  }
};