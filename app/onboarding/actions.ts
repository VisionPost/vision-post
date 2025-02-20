"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/db";
import { redirect } from "next/navigation";
import { getAuthUser } from "../lib/authHelpers";
import { Prisma } from "@prisma/client";

export async function updateStep(step: number) {
    try {
    const user = await getAuthUser();

    await prisma.user.update({
    where: { id: user.id },
    data: {
        onBoardingStep: step,
       },
    });

    revalidatePath("/onboarding");
    } catch (e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error("Database Error", e);
            redirect('/error');
        };
        console.error("Internal server error", e);
        redirect('/error');
    };
    redirect(`/onboarding/${step}`);
};

export async function storeTwitterUserName(twitterUsername: string, step: number) {
    try {
    const user = await getAuthUser();

    if(!twitterUsername.trim()) {
        return { success: false, error: "Please Enter a valid username" };
    };

    await prisma.user.update({
        where: { id: user.id },
        data: {
            x_userName: twitterUsername.trim(),
            onBoardingStep: step,
        },
    });

    revalidatePath("/onboarding");
    } catch (e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error("Database Error", e);
            return { success: false, error: "Database error occured" };
        };
        console.error("Internal server error", e);
        return { success: false, error: "Internal server error" };
    };
};

export async function completeOnboarding() {
    try {
    const user = await getAuthUser();

    await prisma.user.update({
        where: { id: user.id },
        data: {
            isOnboarded: true,
        },
    });

    revalidatePath('/dashboard');
    } catch (e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error("Database Error", e);
            redirect('/error');
        };
        console.error("Internal server error", e);
        redirect('/error');
    };
    redirect("/dashboard");
};