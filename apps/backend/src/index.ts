import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/auth.middleware";
import userRoutes from "./routes/user.routes";
import contributionsRoutes from "./routes/contributions.routes";
import postRoutes from "./routes/posts.routes";
import reposRoutes from "./routes/repos.routes";
import OpenAI from "openai";

dotenv.config();
const port = process.env.PORT || 8080;

const app = express();

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
}));

app.use(cookieParser());
app.use(express.json());

app.use("/user", authMiddleware, userRoutes);
app.use("/fetch-repositories", authMiddleware, reposRoutes);
app.use("/fetch-contributions", authMiddleware, contributionsRoutes);
app.use("/generate-post", authMiddleware, postRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
