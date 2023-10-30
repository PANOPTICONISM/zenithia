import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    jwt.verify(token, process.env.JWT_TOKEN_KEY);
  } catch (err) {
    return res.status(400).json({ error: "Invalid token, auth denied." });
  }
  return next();
};
