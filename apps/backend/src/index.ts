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
import twitterPostRoutes from "./routes/twitterPost.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
    ? ["https://visionpost.dev", "https://www.visionpost.dev"]
    : ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
}));

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Backend API is running!", timestamp: new Date().toISOString() });
});

app.use("/user", authMiddleware, userRoutes);
app.use("/fetch-repositories", authMiddleware, reposRoutes);
app.use("/fetch-contributions", authMiddleware, contributionsRoutes);
app.use("/posts", authMiddleware, postRoutes);
app.use("/twitter-post", authMiddleware, twitterPostRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

