import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    console.log(token);
}

export const config = {
     matcher: [
        '/',
     ]   
}