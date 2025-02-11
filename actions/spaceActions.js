"use server"
import prisma from "@/lib/prisma"
import { userByClerkId } from "./userActions";


export async function createSpace(userId, title, description, selectedTag) {
    try {
        const result = await userByClerkId(userId);
        if (!result.success) {
            throw Error("User not exists with this clerkID")
        }

        // console.log("Submitting the following data:");
        // console.log("User ID:", result.message.id);
        // console.log("Title:", title);
        // console.log("Description:", description);
        // console.log("Selected Tag:", selectedTag);
        const newSpace = await prisma.space.create({
            data: {
                creatorId: result.message.id,
                name:title,
                description,
                tag: selectedTag
            },
        });
        if (newSpace) {
            return { success: true, message: "Successfully created the space!" };
        }
    } catch (error) {
        return { success: false, message: "Failed to create space. Please try again." };
    }
}

