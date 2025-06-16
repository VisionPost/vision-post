import { prisma } from "@repo/db";
import { Request, Response } from "express";

export async function postToTwitter(req: Request, res: Response) {
    try {
        const { sub, accessToken, refreshToken } = req.user;
        const { post } = req.body;

        if(!accessToken && !refreshToken) {
            res.status(401).json({ error: "no valid token credentials" });
            return;
        };

        const response = await fetch("https://api.twitter.com/2/tweets", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type":  "application/json",
            },
            body: JSON.stringify({
                text: post,
            }),
        });

        if(!response.ok) {
            const err = await response.json();
            console.error("Twitter post error", err);
            res.status(500).json({ error: "Failed to post tweet", details: err });
            return;
        };

        const payload = await response.json();

        await prisma.post.create({
            data: {
                userId: sub,
                content: post,
            },
        });

        res.status(200).json({ success: true, tweet: payload });  
    } catch (e) {
        console.error('Server Error:', e);
        res.status(500).json({ 
            message: 'posting to twitter failed',  
        });
    }
};