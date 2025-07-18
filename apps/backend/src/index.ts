import 'dotenv/config';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/auth.middleware";
import userRoutes from "./routes/user.routes";
import contributionsRoutes from "./routes/contributions.routes";
import postRoutes from "./routes/posts.routes";
import reposRoutes from "./routes/repos.routes";
import OpenAI from "openai";
import DodoPayments from "dodopayments";
import twitterPostRoutes from "./routes/twitterPost.routes";
import paymentRoutes from "./routes/payments.routes";
import subscriptionRoutes from "./routes/subscription.routes";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
    ? ["https://visionpost.dev", "https://www.visionpost.dev"]
    : ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
}));

//webhook routes - 
app.use("/subscription", subscriptionRoutes);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const dodopayments = new DodoPayments({
    bearerToken: 
    process.env.NODE_ENV === "development"
    ? process.env.DODO_API_KEY_TEST
    : process.env.DODO_API_KEY_LIVE,
    environment: 
        process.env.NODE_ENV === "development" ? "test_mode" : "live_mode"
});

// Normal routes - 
app.get("/", (req, res) => {
    res.json({ message: "Backend API is running.", timestamp: new Date().toISOString() });
});
app.use("/user", authMiddleware, userRoutes);
app.use("/fetch-repositories", authMiddleware, reposRoutes);
app.use("/fetch-contributions", authMiddleware, contributionsRoutes);
app.use("/posts", authMiddleware, postRoutes);
app.use("/twitter-post", authMiddleware, twitterPostRoutes);
app.use("/payments", authMiddleware, paymentRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

