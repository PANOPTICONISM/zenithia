import bcrypt from "bcrypt";
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
        const [rows] = await connection.execute(sqlInsert, [
          username,
          password,
        ]);
        return res.status(200).json({ message: rows });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
