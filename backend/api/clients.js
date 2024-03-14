import { userToken } from "./middleware/auth.js";
import { connection } from "./middleware/mysql.js";

export const getClients = async (req, res) => {
  const sqlSearch = `SELECT BIN_TO_UUID(id) as id, name, occupation, status, location, company, email, phone_number, created_at 
  FROM clients WHERE user_id = UUID_TO_BIN('${userToken.id}')`;

  try {
    const [rows] = await connection.execute(sqlSearch);
    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving your data." });
  }
};

export const updateClient = async (req, res) => {
  const { body, params } = req;
  const sqlUpdate = `UPDATE clients SET name=?, occupation=?, status=?, location=?, email=?, phone_number=?, company=? WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await connection.execute(sqlUpdate, Object.values(body));
    return res.status(200).send(`Client with id: ${params.id} has been updated.`);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while updating your entry." });
  }
};

export const deleteClient = async (req, res) => {
  const { params } = req;
  const sqlDelete = `DELETE FROM clients WHERE id = UUID_TO_BIN('${params.id}')`;

  try {
    await connection.execute(sqlDelete);
    return res.status(200).send(`Client with id: ${params.id} has been deleted.`);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while deleting your client." });
  }
};

export const postClient = async (req, res) => {
  const { body } = req;
  const sqlInsert = `INSERT INTO clients (id, name, occupation, status, location, company, email, phone_number, user_id) 
  VALUES (UUID_TO_BIN(?),?,?,?,?,?,?,?,UUID_TO_BIN('${userToken.id}'))`;

  try {
    await connection.execute(sqlInsert, Object.values(body));
    return res.status(200).send(`Calendar event added successfully.`);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while adding your client." });
  }
};
