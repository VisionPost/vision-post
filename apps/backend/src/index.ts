import express from "express";
import cors from "cors";
import { prisma } from "@repo/db";
import { Prisma } from "@prisma/client";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware";
import OpenAI from "openai";

dotenv.config();
const port = process.env.PORT || 8080;

const app = express();

const openai = new OpenAI({
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

app.get("/user/:id", authMiddleware, async (req, res)=> {
    try {
    const { id: userId } = req.params;
    
    if(!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
    };

    if(req.user?.sub !== userId) {
        res.status(401).json({ error: "forbidden" });
        return;
    }

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

app.get("/fetch-contributions", authMiddleware, async (req, res) => {
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

        const commitResponse = await fetch(`https://api.github.com/search/commits?q=author:${githubUsername}+sort:author-date-desc&per_page=100`, {
            method: "GET",
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${githubAccessToken}`,
                'X-GitHub-Api-Version': '2022-11-28'
            },
        });

        if(!commitResponse.ok) {
            if(commitResponse.status === 401) {
                const error = await commitResponse.json();
                res.status(401).json({ error: error.message });
                return;
            };
            res.json({ error: "Unexpected error occured" });
            return;
        };

        const commitData = await commitResponse.json(); 

        const prResponse = await fetch(`https://api.github.com/search/issues?q=type:pr+author:${githubUsername}+sort:created-desc&per_page=100`,{
            method: "GET",
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${githubAccessToken}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });

        if(!prResponse.ok) {
            if(prResponse.status === 401) {
                const error = await prResponse.json();
                res.status(401).json({ error: error.message });
                return;
            };
            res.json({ error: "Unexpected error occured" });
            return;
        };

        const prData = await prResponse.json();

        const contributions = [];

        for(const commit of commitData.items) {
            contributions.push({
                type: "commit",
                title: commit.commit.message,
                sha: commit.sha,
                author: commit.author.login,
                image: commit.author.avatar_url,
                date: commit.commit.author.date,
                url: commit.html_url,
                repo: commit.repository.full_name,
                repoDescription: commit.repository.description,
                timestamp: new Date(commit.commit.author.date).getTime(),
            });
        };

        for(const pr of prData.items) {
            const repoFullName = pr.repository_url.split("/").slice(-2).join("/");
            contributions.push({
                type: "pr",
                title: pr.title,
                number: pr.number,
                author: pr.user.login,
                image: pr.user.avatar_url,
                body: pr.body,
                date: pr.created_at,
                url: pr.html_url,
                repo: repoFullName,
                timestamp: new Date(pr.created_at).getTime(),
            });
        };

        contributions.sort((a, b) => b.timestamp - a.timestamp);

        res.status(200).json({ githubData: contributions });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ 
            message: 'Internal server error',  
        }); 
    };
});

app.post("/generate-post", authMiddleware, async (req, res) => {
    try {
        const { sub } = req.user;

        const accessToken = await prisma.account.findFirst({
            where:{
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

        const { type, title, sha, number, author, body, date, url, repo } = req.body;

        let diff = "";

        if(type == "commit") {
            const response = await fetch(`https://api.github.com/repos/${repo}/commits/${sha}`, {
                headers: {
                    "Accept": "application/vnd.github+json",
                    "Authorization": `Bearer ${githubAccessToken}`,
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            },
            );
            if(response.ok) {
                const data = await response.json();
                diff = data.files.filter((file: any) => !file.filename.includes("package-lock.json")).
                map((file: any) => file.patch || "").
                join("/n");
                console.log(diff);
            };
        };

        const userMessage = `You're a developer who just made the following code contribution and want to share it on Twitter. Write a concise, energetic, and non-generic tweet in first-person voice (as if you're tweeting it yourself). Use Emojis. Focus on what was done, why it matters, and add a relevant hashtag.

        **Key Rule**: Always use varied language and avoid repetitive phrasing. Start each tweet with a different action verb or phrase—think "rolled out," "dropped," "launched," "shipped," "boosted," or similar vibes—to keep it fresh and engaging. Avoid overusing any single word or phrase.

        Contribution details:
        - Title: ${title}
        - Type: ${type}
        - author: ${author} 
        - Repository: ${repo}
        - Date: ${date}
        - Commit SHA/PR #: ${sha || number}
        - html_url SHA/PR: ${url}
        - body PR: ${body} 
        - contribution diff: 
        \`\`\`diff
        ${diff}
        \`\`\`
        - Analyze the contribution code diff to pull out one or two key changes—like a new feature, fix, or optimization—and weave them naturally into the tweet. Keep it subtle; no need for code snippets, just a casual mention of the technical side. 
        Avoid thanking yourself, and keep it under 280 characters.
        `.trim();

        const completion = await openai.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                { role: "system", content: "You are a helpful assistant that writes engaging tweets." },
                { role: "user", content: userMessage },
            ]
        });

        const post = completion.choices[0].message.content;
        console.log(post);
        res.status(200).json({ post });
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
