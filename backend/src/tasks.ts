import type { Request, Response } from 'express';
import { userToken } from "./middleware/auth";
import Task from './models/Task';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.findAll({ where: { user_id: userToken.id } });
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving your tasks." });
  }
};

export const postTask = async (req: Request, res: Response): Promise<void> => {
  const { body } = req;

  try {
    await Task.create({ ...body, user_id: userToken.id });
    res.status(200).send(`Task added successfully.`);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding your task." });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { body, params } = req;

  try {
    await Task.update({ ...body }, { where: { id: params.id } });
    res.status(200).send(`Task with id: ${params.id} has been updated.`);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating your task." });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { params } = req;

  try {
    await Task.destroy({ where: { id: params.id } });
    res.status(200).send(`Task with id: ${params.id} has been deleted.`);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting your task." });
  }
};