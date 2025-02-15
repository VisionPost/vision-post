import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getToken } from "next-auth/jwt";

interface RouteParams {
    params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
    try {    
    const token = await getToken({ req });
    if(!token || !token.sub) {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    };

    const { id: userId } = await params;
    
    if(!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    };

    if(token.sub !== userId) {
        return NextResponse.json({ error: "Forbidden: Access denied" }, { status: 403 });
    };

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    
    if(!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    };

    return NextResponse.json(user, { status: 200 });

    } catch (e) {
     if(e instanceof Prisma.PrismaClientKnownRequestError) {
        console.error("Database error:", e);
        return NextResponse.json({ error: "Database query failed"}, { status: 500 });
     };
     console.error("Error fetching user:", e);
     return NextResponse.json({ error: "Internal server error" }, { status: 500 });   
    }
};