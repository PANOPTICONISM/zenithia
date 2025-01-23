import bcrypt from "bcrypt";
import type { Request, Response } from 'express';
import { connection } from "./middleware/mysql.ts";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const username: string = req.body.username;
  const password: string = await bcrypt.hash(req.body.password, 10);

  const sqlSearch = "SELECT * FROM users WHERE email = ?";
  const sqlInsert = "INSERT INTO users (email, password) VALUES (?,?)";

  try {
    const [rows]: [any[], any] = await connection.execute(sqlSearch, [username]);
    if (rows.length >= 1) {
      res.status(401).json({
        message: `An account with email ${username} already exists.`,
      });
    } else {
      try {
        await connection.execute(sqlInsert, [username, password]);
        res.status(200).json({ username });
      } catch (err) {
        res.status(400).json({ message: 'Network error. Try again' });
      }
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
