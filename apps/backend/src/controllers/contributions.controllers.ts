import { Request, Response } from "express";
import { prisma } from "@repo/db";

export async function getContributions(req: Request, res: Response) {
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
};