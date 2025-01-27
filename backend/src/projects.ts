import type { Request, Response } from 'express';
import { userToken } from "./middleware/auth";
import { database } from './middleware/sequelize';

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  const { query } = req;
  const sqlSearch = `SELECT BIN_TO_UUID(id) as id, title, start_date, finish_date, status, revenue, base_price, currency, BIN_TO_UUID(client_id) as client_id, BIN_TO_UUID(user_id) as user_id, created_at 
  FROM projects WHERE user_id = UUID_TO_BIN('${userToken.id}')`;
  const sqlSearchAndJoin = `SELECT BIN_TO_UUID(a.id) as id, 
  a.title, a.start_date, a.finish_date, a.revenue, a.base_price,
  JSON_OBJECT('id', BIN_TO_UUID(c.id), 'name', c.name) as client,
  JSON_ARRAYAGG(JSON_OBJECT('id', BIN_TO_UUID(b.id), 'date', b.date, 'start_time', b.start_time, 'total', b.total)) as time_tracker
  FROM projects a
  LEFT JOIN timetracker b ON a.id=b.project_id
  LEFT JOIN clients c ON c.id=a.client_id
  WHERE a.user_id = UUID_TO_BIN('${userToken.id}')
  GROUP BY a.id`;

  try {
    const [rows] = await database.execute(query.filter ? sqlSearchAndJoin : sqlSearch);
    res.status(200).json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving your projects." });
  }
};

export const updateProjects = async (req: Request, res: Response): Promise<void> => {
  const { body, params } = req;
  const sqlUpdate = `UPDATE projects SET title=?, start_date=?, finish_date=?, status=?, revenue=?, base_price=?, currency=?, client_id=UUID_TO_BIN(?) 
  WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await database.execute(sqlUpdate, Object.values(body));
    res.status(200).send(`Project with id: ${params.id} has been updated.`);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating your project." });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const { params } = req;
  const sqlDelete = `DELETE FROM projects WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await database.execute(sqlDelete);
    res.status(200).send(`Project with id: ${params.id} has been deleted.`);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting your project." });
  }
};

export const postProject = async (req: Request, res: Response): Promise<void> => {
  const { body } = req;
  const sqlInsert = `INSERT INTO projects (id, title, start_date, finish_date, status, revenue, base_price, currency, client_id, user_id) VALUES (UUID_TO_BIN(?),?,?,?,?,?,?,?,UUID_TO_BIN(?),UUID_TO_BIN('${userToken.id}'))`;

  try {
    await database.execute(sqlInsert, Object.values(body));
    res.status(200).send(`Project added successfully.`);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding your project." });
  }
};