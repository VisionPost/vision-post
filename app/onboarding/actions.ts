"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/db";
import { redirect } from "next/navigation";
import { getAuthUser } from "../lib/authHelpers";

export async function updateStep(step: number) {
    const user = await getAuthUser();

    await prisma.user.update({
        where: { id: user.id },
        data: {
            onBoardingStep: step,
        },
    });

    revalidatePath("/onboarding");
    redirect(`/onboarding/${step}`);
};

export async function storeTwitterUserName(twitterUsername: string, step: number) {
    const user = await getAuthUser();

    await prisma.user.update({
        where: { id: user.id },
        data: {
            x_userName: twitterUsername,
            onBoardingStep: step,
        },
    });

    revalidatePath("/onboarding");
    redirect(`/onboarding/${step}`);
};

export async function completeOnboarding() {
    const user = await getAuthUser();

    await prisma.user.update({
        where: { id: user.id },
        data: {
            isOnboarded: true,
        },
    });

    revalidatePath('/dashboard');
    redirect("/dashboard");
};