import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    try {
        const token = await getToken({ req });
        const url = req.nextUrl;

        if(!token) {
            url.pathname = '/auth/signin';
            return NextResponse.redirect(url);
        };

        if (url.pathname.startsWith('/onboarding/')) {
            return NextResponse.next();
        }

        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${token.sub}`);

        if(!response.ok) {
            if(response.status === 404) {
                url.pathname = '/auth/signin';
                return NextResponse.redirect(url);
            }
        };

        const user = await response.json();
        const { onBoardingStep, isOnboarded } = user;

        if(!isOnboarded) {
            url.pathname = `/onboarding/${onBoardingStep}`;
            return NextResponse.redirect(url);
        };

        return NextResponse.next();
    } catch (error) {
        const url = req.nextUrl;
        url.pathname = "/error";
        return NextResponse.redirect(url)
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/onboarding/:path*'],
};
 