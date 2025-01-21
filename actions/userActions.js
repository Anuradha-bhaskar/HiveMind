"use server"
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
export async function syncAction() {
    try {
        const { userId } = await auth();
        const user = await currentUser();
        if (!user || !userId) {
            console.log("something went wrong value unable to fetch : ", { user, userId })
        }

        const alreadyUser = await prisma.user.findUnique({
            where: { clerkId: userId }
        })
        if (alreadyUser) {
            return { success: false, message: "user already exists" }
        }
        const newUser = await prisma.user.create({
            data: {
                clerkId: userId,
                email: user.emailAddresses[0].emailAddress,
                name: `${user.firstName || ""} ${user.lastName || ""}`,
                username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                image: user.imageUrl,

            }
        })

        if (newUser) {

            console.log("new User : ", newUser)

            return { success: true, message: "User created successfully" }
        }

    } catch (error) {
        console.log("Something went wrong while syncing a user ", error)

        return { success: false, message: error }
    }

}