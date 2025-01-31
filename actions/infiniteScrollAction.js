"use server"
import prisma from "@/lib/prisma"

export async function fetchBlogsForInfinte(prev,limit) {
    try {
        const blogs = await prisma.blog.findMany({
            skip: prev,
            take: limit,
            orderBy: { createdAt: "desc" },
        })
       return {success:true,message:blogs}
        
    } catch (error) {
        return { success: false, message: "Something went wrong while fetching" }

        console.log("Error in the blogs page of the infinite scroll thing")
    }
    
}