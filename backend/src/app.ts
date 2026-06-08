import express from "express";
import cors from "cors";
import clientRoutes from "./routes/client.routes.js";
import loanRoutes from "./routes/loan.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Loans API" });
});

app.use("/api/clients", clientRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/payments", paymentRoutes);

export default app;
