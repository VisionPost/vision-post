import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";

export async function getAuthUser() {
    const session = await getServerSession(authOptions);
    if(!session?.user) {
        redirect('/auth/signin');
    };
    return session.user;
};