import express from "express";
import cors from "cors";
import { prisma } from "@repo/db";
import { Prisma } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/user/:id", async (req, res)=> {
    try {
    const { id: userId } = req.params;
    
    if(!userId) {
        res.status(400).json({ error: "User ID is required" });
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
