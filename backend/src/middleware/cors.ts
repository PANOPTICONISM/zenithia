import cors, { CorsOptions } from "cors";

const allowedOrigins = process.env.FRONTEND_URLS?.split(",") || [];

const corsMiddleware = cors({
  origin: (origin, callback) => {
    const isDev = process.env.ENVIRONMENT === "development";

    if (!origin) {
      return isDev
        ? callback(null, true)
        : callback(new Error("CORS error: Missing origin."));
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS error: Origin ${origin} not allowed.`));
  },
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400, // 24 hours
} as CorsOptions);

export default corsMiddleware;
