import bcrypt from "bcrypt";
import { connection } from "./middleware/mysql.js";

export const login = async (req, res) => {
  const username = req.body.username;

  const sqlSearch = "SELECT * FROM users WHERE email = ?";

  try {
    const [rows] = await connection.execute(sqlSearch, [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "No user exists, access denied!" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(req.body.password, rows[0].password);
      if (isPasswordCorrect) {
        return res.status(200).json({ id: rows.id, email: username });
      } else {
        return res.status(401).json({ message: "Your password is incorrect." });
      }
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
