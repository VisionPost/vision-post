import { NextFunction, Request, Response } from "express";
import { jwtDecrypt } from "jose";
import * as crypto from "crypto";

export async function authMiddleware (req: Request, res: Response, next: NextFunction): Promise<void> {
    const secret = process.env.NEXTAUTH_SECRET;

    const cookieName = 
        process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token";

    const cookieToken = req.cookies[cookieName];

    const authHeader = req.headers.authorization?.split(' ')[1];

    const token = cookieToken || authHeader;

    if(!token) {
        res.status(401).json({ error: "Unauthorized: No token provided"});
        return;
    };

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
        
        const { payload } = await jwtDecrypt(token, encryptionKey);

        if(!payload || !payload.sub) {
            console.error("Token payload is invalid or missing required fields");
            res.status(401).json({ error: "Unauthorized: Invalid token payload" });
        };
        console.log("backendpayload:", payload);
        req.user = payload;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(403).json({ error: "Forbidden: Invalid token" });
        return;
    }
};