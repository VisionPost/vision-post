import { Request, Response } from "express";
import { prisma } from "@repo/db";
import { openai } from "./../index";

export async function fetchPublishedPosts(req: Request, res: Response) {
    try {
        const { sub } = req.user;
        const publishedPosts = await prisma.post.findMany({
            where: {
                userId: sub,
            },
        });
        console.log(publishedPosts);
        res.status(200).json({ posts: publishedPosts });
    } catch (e) {
        console.error('Server Error:', e);
        res.status(500).json({ 
            error: 'fetching posts failed',  
        });
    }
};

export async function generatePost(req: Request, res: Response) {
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
        res.status(200).json({ post });
    } catch (e) {
        console.error('Server Error:', e);
        res.status(500).json({ 
            message: 'post generation failed',  
        });
    }
};