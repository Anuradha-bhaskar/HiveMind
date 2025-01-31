"use server"
import prisma from "@/lib/prisma"

export async function fetchBlogsForInfinte(prev,limit) {
    try {
        const blogs = await prisma.blog.findMany({
            skip: prev,
            take: limit,
            orderBy: { createdAt: "desc" },
        })
        console.log("Blogs in the infinite scroll : ", blogs)
        
    } catch (error) {
        console.log("Error in the blogs page of the infinite scroll thing")
    }
    
}