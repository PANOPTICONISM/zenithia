import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import z from "zod";
import { bodyValidation } from "./middleware/bodyValidation";
import User from "./models/User";
import { validateRecaptcha } from "./recaptcha";

const signUpSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
  recaptchaToken: z.string().min(1),
});

export const signUp = [
  bodyValidation(signUpSchema),
  async (req: Request, res: Response): Promise<void> => {
    const { username, password, recaptchaToken } = req.body;
    const isHuman = await validateRecaptcha(recaptchaToken);

    if (!isHuman) {
      res.status(400).json({ message: "Validation failed." });
      return;
    }

    try {
      const existingUser = await User.findOne({ where: { email: username } });
      if (existingUser) {
        res.status(401).json({
          message: `An account with email ${username} already exists.`,
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email: username, hashedPassword });
        res.status(200).json({ email: newUser.email });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error." });
    }
  },
];
