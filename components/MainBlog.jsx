import Image from "next/image"
import Link from "next/link"
import { fetchBlogsForInfinte } from "@/actions/infiniteScrollAction"
import { Badge } from "./ui/badge"

async function MainBlog() {
    const { message } = await fetchBlogsForInfinte(0, 1)
    const blog = message?.[0] || null

    if (!blog) return "No blog available."

    return (
        <div className="bg-white w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href={`/blog/${blog.title.toLowerCase().split(" ").join("-")}-${blog.id}`}>
                {blog && (
                    <div className="flex flex-col">
                        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[315px]">
                            <Image
                                src={blog.image || "/placeholder.svg"}
                                alt={blog.title}
                                fill
                                style={{ objectFit: "cover" }}
                                className="rounded-2xl border"
                            />
                            <Badge className="absolute bottom-2 left-2 bg-black">{blog.tags[0].toLowerCase()}</Badge>
                        </div>
                        <h2 className="text-xl font-bold font-sans tracking-tight leading-tight mt-2">{blog.title}</h2>
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm text-gray-600">
                                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                    </div>
                )}
            </Link>
        </div>
    )
}

export default MainBlog

