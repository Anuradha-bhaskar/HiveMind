"use server"
import prisma from "@/lib/prisma"

export async function checkSavedBlog({ userId, blogId }) {
    try {
        console.log("Inside the check saved blog comp ")
        const saveBlog = await prisma.savedBlog.findFirst({ where: { userId: userId, blogId: blogId } })
        
        if (saveBlog) {
            return { success: true }
        } else {
            return { success: false}

        }
    } catch (e) {
        console.log("Error in the saved blogs actions ")
        return { success: false }
    }
}
 
export async function toggleBookMarked(userId , blogId) {
    try {

        
        console.log("insidee sommeone : ",userId,blogId)
        const existingSave = await prisma.savedBlog.findFirst({
            where: {
                userId: userId,
                blogId: blogId
            }
        })
        if (existingSave) {
            await prisma.savedBlog.delete({
                where: {
                    id: existingSave.id
                }
            })
        }
        else {
            await prisma.savedBlog.create({
                data: {
                    userId: userId,
                    blogId: blogId
                }
            })
        }
        return { success: true, message: "Bookmarked toggled successfully" }
    } catch (error) {
        console.log("Error while toggling bookmark in blogActions")
        return { success: false, message: "Something went wrong while toggling bookmark" }
    }
 }