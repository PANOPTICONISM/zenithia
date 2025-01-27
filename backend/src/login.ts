import bcrypt from "bcrypt";
import type { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import User from "./models/User";

export const login = async (req: Request, res: Response): Promise<void> => {
  const username: string = req.body.username;

  const sqlSearch: string = "SELECT BIN_TO_UUID(id) as id, email, password FROM users WHERE email = ?";

  try {
    const user = await User.findOne({ where: { email: username } });
    if (!user) {
      res.status(401).json({ message: "No user exists, access denied!" });
    } else {
      const isPasswordCorrect: boolean = await bcrypt.compare(req.body.password, user.dataValues.password);
      if (isPasswordCorrect) {
        const token: string = jwt.sign(
          { id: user.dataValues.id, user: username },
          process.env.JWT_TOKEN_KEY as string,
          {
            expiresIn: "24h",
          }
        );
        res.status(200).json({ id: user.dataValues.id, email: username, token });
      } else {
        res.status(401).json({ message: "Your password is incorrect." });
      }
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
