"use server"
import prisma from "@/lib/prisma"
import cloudinary from "@/lib/cloudinary"
import { userByUsername } from "./userActions";
import { currentUser } from "@clerk/nextjs/server";

export async function uploadImageAndCreateBlog(storyTitle, content, selectedTags, base64Image, username, formData) {
    try {
        console.log('formdata : ',formData)
        const resultuser = await userByUsername(username);
        const result = await cloudinary.uploader.upload(base64Image, {
            resource_type: 'image',
        });


        let videoUrl = "";
        if (formData) {
            const file = formData.get('videoFile');
            console.log("file ",file)
            if (file) {  // Add this check
                try {
                    const buffer = Buffer.from(await file.arrayBuffer());
                    console.log("Buffer : ",buffer)
                    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;
                    const response = await cloudinary.uploader.upload(base64Image, {
                        resource_type: 'video',
                        public_id: 'my_video',
                    });
                    videoUrl = response.secure_url;
                } catch (error) {
                    console.log("Error uploading video:", error);
                }
            }
        }
        console.log("done video")
        console.log("vidoe url : ",videoUrl)

        const Blog = await prisma.blog.create({
            data: {
                tags: selectedTags,
                authorId: resultuser.message.id,
                title: storyTitle,
                image: result.secure_url,
                content: content,
                video: videoUrl || null,
            }
        });

        if (Blog) {
            return { success: true, message: "Blog created successfully" };
        }


    } catch (error) {
       
        return { success: false, message: "Something went wrong while creating blogs" };
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
        const { userId, blogId, comment } = params;
        // console.log("-- inside the try and catch : ", { userId, blogId, comment })
        const commentc = await prisma.comment.create({
            data: {
                authorId: userId,
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

export async function checkLikedBlog(userId, blogId) {
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

export async function getYourBlogs(userId) {
    try {
        const blogs = await prisma.blog.findMany({
            where: {
                authorId: userId
            }
        });

        if (blogs.length > 0) {
            return { success: true, message: blogs };
        } else {
            return { success: false, message: "No blogs found" };
        }
    } catch (error) {
        return { success: false, message: "Failed to fetch blogs" };
    }
}

export async function getCategoryAndSortedBlogs(sort, category) {
    try {
        let orderBy = { createdAt: "desc" };

        if (sort === "newest") {
            orderBy = { createdAt: "desc" };
        } else if (sort === "most-popular") {
            orderBy = [
                {
                    createdAt: "desc" // Default sorting, can be adjusted based on your needs
                },
                {
                    likes: {
                        _count: 'desc' // Sorting blogs by the number of likes
                    }
                }
            ]
        }

        const blogs = await prisma.blog.findMany({
            where: {
                tags: {
                    has: category
                }
            },
            orderBy
        });

        return { success: true, message: "Successfully fetched the blogs", data: blogs };
    } catch (error) {
        console.log("Error fetching blogs:", error.message);
        return { success: false, message: "Failed to fetch the blogs" };
    }
}
