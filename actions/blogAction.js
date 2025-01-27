"use server"
import prisma from "@/lib/prisma"
import cloudinary from "@/lib/cloudinary"
import { userByUsername } from "./userActions";
export async function uploadImageAndCreateBlog(storyTitle, content, selectedTags, base64Image , username) {
   

    try {

        const resultuser = await userByUsername(username);
        console.log(base64Image)

        
            console.log("Inside the rsult part ")
            const result = await cloudinary.uploader.upload(base64Image, {
                resource_type: 'image',
            });
            console.log("result : ", result)
        
        

        console.log("Blog Payload Debug:", {
            tags: selectedTags,
            authorId: resultuser.message.id,
            title: storyTitle,
            image: result.secure_url,
            content: content,
        });

        const Blog = await prisma.blog.create({
            data: {
                tags:selectedTags,
                authorId: resultuser.message.id,
                title: storyTitle,
                image:result.secure_url,
                content:content
            }
        })
        if (Blog) {
            return {success:true ,message:"Blog created successfully"}
        }

    } catch (error) {
        console.log("Error,",error)
        return { success: false, message: "Something went wrong while creating blogs" }
    }
}

export async function getBlogById(params) {
    try {
        const blogId = params;
        if (!blogId) {
            return {success :false , message:"Blog Id is required"}
        }

        const blog = await prisma.blog.findUnique({
            where: {
                id:blogId
            }
        })
        return {success:true, message:blog}
    } catch (error) {
        console.log("Error,",error)
        return { success: false, message: "Something went wrong while fetching blog" }
    }
}

export async function postComments(params) {

    console.log("----inside the post comment actions",params)
    try {
        const { authorId, blogId, comment } = params;
        console.log("-- inside the try and catch : ",{authorId, blogId, comment})
        const commentc = await prisma.comment.create({
            data: {
                authorId: authorId,
                blogId: blogId,
                content: comment,
                isAnswer:false
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
            return {success:false,message:"Blog id not found in blogActions"}
        }
        const comments = await prisma.comment.findMany({
            where: { blogId: blogId },
            include: { author: true },
            orderBy: { createdAt: 'desc' },
        });
        if (comments) {
            return {success:true,message:comments}
        }
    } catch (error) {
        console.log("Error while fetching comments in blogActions")
        return { success: false, message: "Something went wrong while fetching comments" }
        
    }
}
