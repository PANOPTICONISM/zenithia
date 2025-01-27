import type { Request, Response } from 'express';
import { userToken } from "./middleware/auth";
import Client from './models/Client';

export const getClients = async (req: Request, res: Response): Promise<void> => {
  try {
    const clients = await Client.findAll({
      where: { user_id: userToken.id },
      attributes: ['id', 'name', 'occupation', 'status', 'location', 'company', 'email', 'phone_number', 'created_at']
    });
    res.status(200).json(clients);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while retrieving your data." });
  }
};

export const postClient = async (req: Request, res: Response): Promise<void> => {
  const { body } = req;
  try {
    await Client.create({
      ...body,
      user_id: userToken.id
    });
    res.status(200).send(`Client added successfully.`);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding your client." });
  }
};

export const updateClient = async (req: Request, res: Response): Promise<void> => {
  const { body, params } = req;
  try {
    await Client.update(body, {
      where: { id: params.id }
    });
    res.status(200).send(`Client with id: ${params.id} has been updated.`);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating your entry." });
  }
};

export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  const { params } = req;
  try {
    await Client.destroy({
      where: { id: params.id }
    });
    res.status(200).send(`Client with id: ${params.id} has been deleted.`);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting your client." });
  }
};
