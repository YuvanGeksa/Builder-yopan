import express from "express";
import cors from "cors";
import { APP } from "./config/constants.js";
import { connectDb } from "./services/db.js";
import { sitesPublic } from "./routes/sites.public.js";
import { payments } from "./routes/payments.js";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: "2mb" }));

app.get("/health", (req, res) => res.json({ ok: true, name: APP.name }));

app.use("/api", sitesPublic);
app.use("/api", payments);

await connectDb();

app.listen(APP.port, () => {
  console.log(`[API] running on http://localhost:${APP.port}`);
});
