import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connection } from "./middleware/mysql.js";

export const login = async (req, res) => {
  const username = req.body.username;

  const sqlSearch = "SELECT BIN_TO_UUID(id), email, password FROM users WHERE email = ?";

  try {
    const [rows] = await connection.execute(sqlSearch, [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "No user exists, access denied!" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(req.body.password, rows[0].password);
      if (isPasswordCorrect) {
        const token = jwt.sign(
          { id: rows[0].id, user: username },
          process.env.JWT_TOKEN_KEY,
          {
            expiresIn: "43200",
          }
        );
        return res.status(200).json({ id: rows[0].id, email: username, token });
      } else {
        return res.status(401).json({ message: "Your password is incorrect." });
      }
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
