import { Request, Response } from "express";
import { prisma } from "@repo/db";

export async function getRepos(req: Request, res: Response) {
    try {
        const { sub } = req.user;

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

        const response = await fetch(`https://api.github.com/user/repos`, {
            method: "GET",
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${githubAccessToken}`,
                'X-GitHub-Api-Version': '2022-11-28'
            },
        });

        if(!response.ok) {
            const error = await response.json();
            console.error("Failed to fetch repositories", error);
            res.status(500).json({ error: error });
            return;
        };

        const repos = await response.json();
        res.status(200).json({ repos });
        console.log(repos);
    } catch (e) {
        console.error("Internal server error",e);
    };
};