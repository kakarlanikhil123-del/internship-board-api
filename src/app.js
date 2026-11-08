import express from "express";
import cors from "cors";
import internshipRoutes from "./routes/internshipRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Internship Board API is running" });
});

app.use("/api/internships", internshipRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
