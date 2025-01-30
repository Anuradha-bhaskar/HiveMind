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
            th
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
        // console.log("Something went wrong while syncing a user ", error)
        return { success: false, message: error }
    }

}
export async function userByUsername(params) {
    try {
        const username = params
        console.log(username)
        if (!username) {
            console.log("username not found")
            return { success: false, message: "Username have not received " }
        }
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
            include: {
                _count: {
                    select: {
                        followers: true, 
                        following: true, 
                    },
                },
            },
        });

        if (user) {

            return { success: true, message: user }

        }

    } catch (error) {
        console.log("Error while fetching user by username")
        return { success: false, message: error }

    }
}
export async function userById(params) {
    try {
        const id =params 
        console.log(id)
        if (!id) {
            console.log("id not found")
            return { success: false, message: "not id received" }
        }
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            include: {
                _count: {
                    select: {
                        followers: true, // Counts users who are following this user
                        following: true, // Counts users this user is following
                    },
                },
            },
        });

        if (user) {

            return { success: true, message: user }
        }
    } catch (error) {
        console.log("Error while fetching user by id")
        return { success: false, message: error }

    }
}
export async function userByClerkId(params) {
    try {
        const clerkId = params
        console.log(clerkId)
        if (!clerkId) {
            console.log("clerkId not found")
            return { success: false, message: "clerkId not found" }
        }
        const user = await prisma.user.findUnique({
            where: {
                clerkId: clerkId,
            }
        });
        if (user) {
            return { success: true, message: user }
        }

    } catch (error) {
        console.log("Error while fetching user by clerkId")
        return { success: false, message: error }

    }
}
export async function saveChangesOfProfile(params) {
    try {
        const { name, bio, location, website, username } = params;
        const user = await prisma.user.update({
            where: {
                username: username

            },
            data: {
                name: name,
                bio: bio,
                website: website,
                location: location
            }
        })
        if (user) {
            // console.log("Done changes in the user profile : ", user)
            return { success: true, message: "profile updated successfully " }
        }
        
    } catch (error) {
        return { success: false, message: "Something went wrong while updating profile " }

    }
    
    

    
}
export async function checkFollowing(userId, authorId) {
    try {
        const result = await prisma.follows.findFirst({
            where: {
                followerId: userId,
                followingId: authorId
            }
        });

        return { success: true, isFollowing: !!result }; // Explicitly return follow status
    } catch (error) {
        console.error("Error checking follow status");
        return { success: false, message: "Something went wrong while checking following" };
    }
}

export async function toggleFollow(userId, authorId) { 

    try {
        const existingfollow = await prisma.follows.findFirst({
            where: {
                followerId: userId,
                followingId: authorId
            }
        })

        if (existingfollow) {
            await prisma.follows.delete({
                where: {
                    followerId_followingId: { // Use composite key
                        followerId: userId,
                        followingId: authorId
                    }
                }
            })
        } else {
            await prisma.follows.create({
                data: {
                    followerId: userId,
                    followingId: authorId
                }
            })
        }
        return { success: true, message: "Follow toggled successfully" }
    } catch (error) {
        return {success: false, message: "Something went wrong while toggling follow" }
    }
}
