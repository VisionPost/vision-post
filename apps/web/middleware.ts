import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    try {
        const token = await getToken({ req });
        const url = req.nextUrl.clone(); 

        if(!token || !token.sub) {
            return NextResponse.redirect(new URL('/signin', req.url));
        };

        const jweToken = await getToken({ req, raw: true });
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${token.sub}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jweToken}`,
            },
        });

        if(!response.ok) {
            const errorData = await response.json();

            if(response.status === 401) {
                console.error("Unauthorized", errorData.error);
                return NextResponse.redirect(new URL('/signin', req.url));
            };

            if(response.status === 404) {
                console.error("User not found", errorData.error);
                return NextResponse.redirect(new URL('/signin', req.url));
            };

            if(response.status === 400) {
                console.error("Bad request", errorData.error);
                return NextResponse.redirect(new URL('/signin', req.url));
            };
            console.error("Api error", errorData.error);
            return NextResponse.redirect(new URL('/error', req.url));
        };

        const user = await response.json();
        const {onBoardingStep, isOnboarded } = user;

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
        console.error("Middleware Error:", error);
        return NextResponse.redirect(new URL('/error', req.url));
    }
};

export const config = {
    matcher: [
        '/dashboard/:path*', 
        '/onboarding/:path*', 
    ],
};
 