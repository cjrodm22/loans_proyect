import app from "./app.js";
import { pool } from "./config/db.js";

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error", error);
  }
};
startServer();
