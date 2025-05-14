import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import z from "zod";
import { bodyValidation } from "./middleware/bodyValidation";
import User from "./models/User";
import { validateRecaptcha } from "./recaptcha";

const loginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(1),
  recaptchaToken: z.string().optional(),
  isAllowedToLogIn: z.boolean().optional(),
});

export const login = [
  bodyValidation(loginSchema),
  async (req: Request, res: Response): Promise<void> => {
    const { username, password, recaptchaToken, isAllowedToLogIn } = req.body;
    const isHuman = await validateRecaptcha(recaptchaToken);

    if (!isHuman && !isAllowedToLogIn) {
      res.status(400).json({ message: "Validation failed." });
      return;
    }

    try {
      const user = await User.findOne({ where: { email: username } });
      if (!user) {
        res.status(401).json({ message: "Your login details are incorrect." });
      } else {
        const isPasswordCorrect: boolean = await bcrypt.compare(
          password,
          user.dataValues.password
        );
        if (isPasswordCorrect) {
          const token: string = jwt.sign(
            { id: user.dataValues.id, user: username },
            process.env.JWT_TOKEN_KEY as string,
            {
              expiresIn: "24h",
            }
          );
          res
            .status(200)
            .json({ id: user.dataValues.id, email: username, token });
        } else {
          res
            .status(401)
            .json({ message: "Your login details are incorrect." });
        }
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error." });
    }
  },
];
