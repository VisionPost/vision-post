import { prisma } from "@repo/db";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

export async function getUser(req: Request, res: Response) {
    try {
        const { id: userId } = req.params;
        
        if(!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        };
    
        if(req.user?.sub !== userId) {
            res.status(401).json({ error: "forbidden" });
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
};