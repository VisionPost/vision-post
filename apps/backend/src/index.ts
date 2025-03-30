import express from "express";
import cors from "cors";
import { prisma } from "@repo/db";
import { Prisma } from "@prisma/client";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware";

dotenv.config();
const port = process.env.PORT || 8080;

const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization"],
}));

app.use(cookieParser());
app.use(express.json());

app.get("/user/:id", authMiddleware, async (req, res)=> {
    try {
    const { id: userId } = req.params;
    
    if(!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
    };

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if(!user) {
        res.status(404).json({ error: "User not found"});
        return;
    };

    res.status(200).json(user);
    } catch (e) {
        if(e instanceof Prisma.PrismaClientInitializationError) {
            console.error("Database error:", e);
            res.status(500).json({ error: "Database query failed"});
            return;
        };
        console.error("Error fetching user:", e);
        res.status(500).json({ error: "Internal server error"});
    };
});

app.get("/fetch-commits", authMiddleware, async (req, res) => {
    try {
        const { githubUsername, sub } = req.user;

        const accessToken = await prisma.account.findFirst({
            where: { 
                userId: sub,
                provider: "github",
            },
            select: {
                access_token: true,
            },
        });

        if(!accessToken?.access_token) {
            res.status(404).json({ error: "No access token found" });
            return;
        };

        const githubAccessToken = accessToken.access_token;

        const response = await fetch(`https://api.github.com/search/commits?q=author:${githubUsername}+sort:author-date-desc`, {
            method: "GET",
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${githubAccessToken}`,
                'X-GitHub-Api-Version': '2022-11-28'
            },
        });

        if(!response.ok) {
            if(response.status === 401) {
                const error = await response.json();
                res.status(401).json({ error: error.message });
                return;
            };
            res.json({ error: "Unexpected error occured" });
            return;
        };

        const data = await response.json(); 
        res.status(200).json({ commits: data }); 

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ 
            message: 'Internal server error',  
        }); 
    };
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
