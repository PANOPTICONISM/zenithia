import type { Request, Response } from "express";
import { userToken } from "./middleware/auth";
import Calendar from "./models/Calendar";

export const getCalendar = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const calendars = await Calendar.findAll({
      where: { user_id: userToken.id },
      attributes: ["id", "title", "start", "end", "created_at"],
    });
    res.status(200).json(calendars);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving your data." });
  }
};

export const updateCalendar = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { body, params } = req;
  try {
    await Calendar.update(body, {
      where: { id: params.id },
    });
    res.status(200).send(`Calendar with id: ${params.id} has been modified`);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating your entry." });
  }
};

export const deleteCalendar = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { params } = req;
  try {
    await Calendar.destroy({
      where: { id: params.id },
    });
    res
      .status(200)
      .send(`Calendar entry with id: ${params.id} has been deleted.`);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting your event." });
  }
};

export const postCalendar = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { body } = req;
  try {
    await Calendar.create({
      ...body,
      user_id: userToken.id,
    });
    res.status(200).send(`Calendar event added successfully.`);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding your event." });
  }
};
