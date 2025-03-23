import { NextFunction, Request, Response } from "express";
import { jwtDecrypt } from "jose";
import * as crypto from "crypto";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export async function authMiddleware (req: Request, res: Response, next: NextFunction): Promise<void> {
    const secret = process.env.NEXTAUTH_SECRET;

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Unauthorized: No token provided"});
        return;
    };

    const jweToken = authHeader.split(" ")[1];

    try {
        const secretBytes = new TextEncoder().encode(secret);
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            secretBytes,
            { name: 'HKDF' },
            false,
            ['deriveBits', 'deriveKey']
        );
        
        const encryptionKey = await crypto.subtle.deriveKey(
            {
                name: 'HKDF',
                hash: 'SHA-256',
                salt: new Uint8Array(0),
                info: new TextEncoder().encode('NextAuth.js Generated Encryption Key')
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['decrypt']
        );
        
        const { payload } = await jwtDecrypt(jweToken, encryptionKey);

        if(!payload || !payload.sub) {
            console.error("Token payload is invalid or missing required fields");
            res.status(401).json({ error: "Unauthorized: Invalid token payload" });
        };

        req.user = payload;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(403).json({ error: "Forbidden: Invalid token" });
        return;
    }
};