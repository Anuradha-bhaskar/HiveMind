"use server"
import prisma from "@/lib/prisma"
import cloudinary from "@/lib/cloudinary"
import { userByClerkId, userByUsername } from "./userActions";
import {  currentUser } from "@clerk/nextjs/server";

export async function uploadImageAndCreateBlog(storyTitle, content, selectedTags, base64Image, username) {


    try {

        const resultuser = await userByUsername(username);


        const result = await cloudinary.uploader.upload(base64Image, {
            resource_type: 'image',
        });
    


        // console.log("Blog Payload Debug:", {
        //     tags: selectedTags,
        //     authorId: resultuser.message.id,
        //     title: storyTitle,
        //     image: result.secure_url,
        //     content: content,
        // });

        const Blog = await prisma.blog.create({
            data: {
                tags: selectedTags,
                authorId: resultuser.message.id,
                title: storyTitle,
                image: result.secure_url,
                content: content
            }
        })
        if (Blog) {
            return { success: true, message: "Blog created successfully" }
        }

    } catch (error) {
        console.log("Error,", error)
        return { success: false, message: "Something went wrong while creating blogs" }
    }
}

export async function getBlogById(params) {
    try {
        const blogId = params;
        if (!blogId) {
            return { success: false, message: "Blog Id is required" }
        }

        const blog = await prisma.blog.findUnique({
            where: {
                id: blogId
            }
        })
        return { success: true, message: blog }
    } catch (error) {
        // console.log("Error,", error)
        return { success: false, message: "Something went wrong while fetching blog" }
    }
}

export async function postComments(params) {

    try {
        const { authorId, blogId, comment } = params;
        console.log("-- inside the try and catch : ", { authorId, blogId, comment })
        const commentc = await prisma.comment.create({
            data: {
                authorId: authorId,
                blogId: blogId,
                content: comment,
                isAnswer: false
            }
        })
        if (commentc) {
            return { success: true, message: "Comment posted successfully" }
        } else {
            return { success: false, message: "Something went wrong while posting comment" }
        }
    } catch (error) {
        console.log("Something went wronng inn action of comment : ")
    }
}

export async function getComments(params) {
    try {
        const blogId = params;
        if (!blogId) {
            return { success: false, message: "Blog id not found in blogActions" }
        }
        const comments = await prisma.comment.findMany({
            where: { blogId: blogId },
            include: {
                author: true
                , likes: true
            },
            orderBy: { createdAt: 'desc' },
        });
        if (comments) {
            return { success: true, message: comments }
        }
    } catch (error) {
        console.log("Error while fetching comments in blogActions")
        return { success: false, message: "Something went wrong while fetching comments" }

    }
}

export async function toggleCommentLike(params) {
    try {
        const user = await currentUser();
        const username = user.emailAddresses[0].emailAddress.split("@")[0];
        console.log("username : ", username)
        const result = await userByUsername(username);
        const userId = result.message.id;
        const { commentId, blogId } = params;
        console.log("Inside the toggle comment like", { userId, commentId, blogId })
        if (!userId || !commentId || !blogId) {
            return { success: false, message: "userId, commentId, blogId is required in toggleCommentLike" }
        }
        const existingLike = await prisma.like.findFirst({
            where: {
                userId: userId,
                commentId: commentId,
                blogId: blogId
            }
        })
        console.log("Existing like:", existingLike)
        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            })
        }
        else {
            await prisma.like.create({
                data: {
                    userId: userId,
                    commentId: commentId,
                    blogId: blogId
                }
            })
        }
        return { success: true, message: "Like toggled successfully" }
    } catch (error) {
        console.log("Error while toggling like in blogActions")
        return { success: false, message: "Something went wrong while toggling like" }

    }
}

export async function checkLikedBlog( userId, blogId ) {
    try {
        const result = await prisma.like.findFirst({ where: { userId: userId, blogId: blogId } })
        if (result) {
            return { success: true }
        }
        else {
            return { success: false }
        }
    } catch (error) {
        console.log("something went wrong while checking liked")
        return { success: false }
    }
    
}

export async function toggleBlogLike(userId, blogId) {
    try {
        
        const existingLike = await prisma.like.findFirst({
            where: {
                userId: userId,
                blogId: blogId
            }
        })
        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            })
        }
        else {
            await prisma.like.create({
                data: {
                    userId: userId,
                    blogId: blogId
                }
            })
        }
        return { success: true, message: "Like toggled successfully" }
    } catch (error) {
        console.log("Error while toggling like in blogActions")
        return { success: false, message: "Something went wrong while toggling like" }

    }
    
}