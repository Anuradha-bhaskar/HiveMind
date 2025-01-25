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