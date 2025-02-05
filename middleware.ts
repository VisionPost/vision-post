import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    console.log(token);
    const url = req.nextUrl;
    console.log(url);
}

export const config = {
    matcher: ['/'],
};
 