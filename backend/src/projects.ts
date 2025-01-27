import type { Request, Response } from 'express';
import { userToken } from "./middleware/auth";
import Client from './models/Client';
import Project from './models/Project';
import TimeTracker from './models/TimeTracker';

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.findAll({
      where: { user_id: userToken.id },
      include: [
        {
          model: Client,
          as: 'client',
          attributes: ['id', 'name']
        },
        {
          model: TimeTracker,
          as: 'timeTracker',
          attributes: ['id', 'date', 'start_time', 'total']
        }
      ],
      group: ['Project.id']
    });

    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving your projects." });
  }
};

export const postProject = async (req: Request, res: Response): Promise<void> => {
  const { body } = req;

  try {
    const project = await Project.create({
      ...body,
      user_id: userToken.id
    });

    res.status(201).json({ project });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding your project." });
  }
};

export const updateProjects = async (req: Request, res: Response): Promise<void> => {
  const { body, params } = req;

  try {
    await Project.update(body, {
      where: { id: params.id }
    });
    res.status(200).send(`Project with id: ${params.id} has been updated.`);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating your project." });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const { params } = req;

  try {
    const deleted = await Project.destroy({
      where: { id: params.id }
    });
    res.status(200).send(`Project with id: ${params.id} has been deleted.`);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting your project." });
  }
};