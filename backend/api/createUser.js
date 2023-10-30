import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connection } from "./middleware/mysql.js";

export const signUp = async (req, res) => {
  const username = req.body.username;
  const password = await bcrypt.hash(req.body.password, 10);

  const sqlSearch = "SELECT * FROM users WHERE email = ?";

  const sqlInsert = "INSERT INTO users VALUES (0,?,?)";

  try {
    const [rows] = await connection.execute(sqlSearch, [username]);
    if (rows.length >= 1) {
      return res.status(401).json({
        message: `An account with email ${username} already exists.`,
      });
    } else {
      try {
        await connection.execute(sqlInsert, [
          username,
          password,
        ]);
        const token = jwt.sign(
          { user: username },
          process.env.JWT_TOKEN_KEY,
          {
            expiresIn: "12h",
          }
        );
        return res.status(200).json({ username, token });
      } catch (err) {
        return res.status(400).json({ message: 'Network error. Try again' });
      }
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
