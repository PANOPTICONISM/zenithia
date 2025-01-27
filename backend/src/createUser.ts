import bcrypt from "bcrypt";
import type { Request, Response } from 'express';
import User from "./models/User";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const username: string = req.body.username;
  const password: string = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await User.findOne({ where: { email: username } });
    if (user) {
      res.status(401).json({
        message: `An account with email ${username} already exists.`,
      });
    } else {
      const newUser = await User.create({ email: username, password });
      res.status(200).json({ email: newUser.email });
    }
  } catch (err) {
    res.status(400).json({ message: 'Network error. Try again' });
  }
};
