"use server"
import prisma from "@/lib/prisma"
import { userByClerkId } from "./userActions";
import cloudinary from "@/lib/cloudinary"

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
                name: title,
                description,
                tag: selectedTag
            },
        });
        if (!newSpace) {
            return { success: false, message: "Something went wrong while creating a space" };
        }
        const addAsSpaceMember = await prisma.spaceMember.create({
            data: {
                spaceId: newSpace.id,
                userId: userId
            }
        })

        if (!addAsSpaceMember) {
            return { success: false, message: "Error while adding creator in the space member table" };


        }

        return { success: true, message: "Successfully created the space" };


    } catch (error) {
        return { success: false, message: "Failed to create space. Please try again." };
    }
}

export async function getSpaceById(spaceId) {
    try {
        const space = await prisma.space.findUnique({
            where: { id: spaceId },
            include: {
                _count: {
                    select: {
                        members: true,
                        questions:true
                   }
               }
           }


        });

        if (!space) {
            return { success: false, message: "Space not found", data: null };
        }

        return { success: true, message: "Successfully fetched the details", data: space };
    } catch (error) {
        return { success: false, message: "Error fetching space details", error: error.message };
    }
}

export async function toggleFollowSpace(userId, spaceId) {
    try {

        
        const existingMembership = await prisma.spaceMember.findUnique({
            where: { userId_spaceId: { userId, spaceId } }
        });

        if (existingMembership) {
            await prisma.spaceMember.delete({
                where: { id: existingMembership.id }
            });
            return { success: true, message: "Unfollowed the space" };
        } else {
            await prisma.spaceMember.create({
                data: { userId, spaceId }
            });
            return { success: true, message: "Followed the space" };
        }
    } catch (error) {
        return { success: false, message: "Error toggling follow", error: error.message };
    }
}

export async function checkSpaceFollowing(userId, spaceId) {
    try {

        const haveSpaceMember = await prisma.spaceMember.findUnique({
            where: {
                userId_spaceId: {
                    userId,
                    spaceId
                }
            }
        })

        if (!haveSpaceMember) {
            return { success: false, message: "Doesn`t follow space yet" }

        }
        return { success: true, message: "Already follow the space" }
    } catch (error) {
        return { success: false, message: "something went wrong while checkinng follow status " }
    }

}

export async function getSpaceByUserId(userId) {
    try {
        const spaces = await prisma.space.findMany({
            where:
            {
                userId: userId
            }
        })

        if (!spaces) {
            return { success: false, message: "UnSuccessfully fetched the data", data: null }
        }
        return { success: true, message: "Successfully fetched the data", data: spaces }

    } catch (error) {
        return { success: false, message: "Something went wrong while fetching spaces", error: error.message };
    }
}

export async function getOwnerFromSpaceId(spaceId) {
    try {
        const owner = await prisma.space.findUnique({
            where: {
                id: spaceId
            },
            include: {
                creator: true
            }
        })

        if (!owner) {
            return { success: false, message: "Unable to find the owner of the space", data: null }
        }
        return { success: true, message: "Successfullt fetched the owner ", data: owner }
    } catch (error) {
        return { success: false, message: "Something went wrong while fetching the owner", error: error.message }

    }

}

export async function editSpaceDetails(spaceId, name, description, image1, image2) {
    try {
       
        const avatar = await cloudinary.uploader.upload(image1, {
            resource_type: 'image',
        });

        const banner = await cloudinary.uploader.upload(image2, {
            resource_type: 'image',
        });

        const space = await prisma.space.update({
            where: {
                id: spaceId
            },
            data: {
                name: name,
                description: description,
                image1: avatar.secure_url,
                image2: banner.secure_url
            }
        });

        if (space) {
            return { success: true, message: "Space details updated successfully." };
        } else {
            return { success: false, message: "Failed to update space details." };
        }
    } catch (error) {
        console.error("Error updating space details:", error);
        return { success: false, message: "An error occurred while updating space details.", error: error.message };
    }
}


export async function getFollowersOfSpace(spaceId) {
    try {
        const users = await prisma.spaceMember.findMany({
            where: {
                spaceId: spaceId
            },
            include: {
                user: true
            }
        });

        return { success: true, message: "Followers retrieved successfully", data: users };
    } catch (error) {
        console.error("Error fetching followers:", error);
        return { success: false, message: "Failed to retrieve followers", error: error.message };
    }
}
