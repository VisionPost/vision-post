import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    try {
        const token = await getToken({ req });
        const url = req.nextUrl.clone();

        if(!token) {
            return NextResponse.redirect(new URL('/auth/signin', req.url));
        };

        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${token.sub}`);

        if(!response.ok) {
            if(response.status === 404) {
                return NextResponse.redirect(new URL('/auth/signin', req.url));
            };
        };

        const user = await response.json();
        const {onBoardingStep, isOnboarded } = user;

        console.log(onBoardingStep, isOnboarded);

        if (isOnboarded && url.pathname.startsWith('/onboarding')) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        };

        if (!isOnboarded) {
            if (url.pathname.startsWith('/onboarding/')) {
                const requestedStep = parseInt(url.pathname.split('/').pop() || '1');
                
                if (requestedStep !== onBoardingStep) {
                    return NextResponse.redirect(new URL(`/onboarding/${onBoardingStep}`, req.url));
                }
            } else {
                return NextResponse.redirect(new URL(`/onboarding/${onBoardingStep}`, req.url));
            }
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.redirect(new URL('/error', req.url));
    }
};

export const config = {
    matcher: ['/dashboard/:path*', '/onboarding/:path*'],
};
 