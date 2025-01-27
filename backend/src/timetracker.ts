import type { Request, Response } from 'express';
import { userToken } from "./middleware/auth";
import Project from './models/Project';
import TimeTracker from './models/TimeTracker';

export const getTimeTracker = async (req: Request, res: Response): Promise<void> => {
  try {
    const timetrackers = await TimeTracker.findAll({
      where: { user_id: userToken.id },
      include: [{
        model: Project,
        attributes: ['id', 'title']
      }]
    });
    res.status(200).json(timetrackers);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving your time tracker data." });
  }
};

export const postTimeTracker = async (req: Request, res: Response): Promise<void> => {
  const { body } = req;
  try {
    await TimeTracker.create({
      ...body,
      user_id: userToken.id
    });
    res.status(200).send(`Timestamp added successfully.`);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding your timestamp." });
  }
};

export const updateTimeTracker = async (req: Request, res: Response): Promise<void> => {
  const { body, params } = req;
  try {
    await TimeTracker.update(body, {
      where: { id: params.id }
    });
    res.status(200).send(`Entry with id: ${params.id} has been updated.`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while updating your entry." });
  }
};

export const deleteTimeTracker = async (req: Request, res: Response): Promise<void> => {
  const { params } = req;
  try {
    await TimeTracker.destroy({
      where: { id: params.id }
    });
    res.status(200).send(`Entry with id: ${params.id} has been deleted.`);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting your entry." });
  }
};
