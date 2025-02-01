import Image from "next/image";
import Link from "next/link";
import { fetchBlogsForInfinte } from "@/actions/infiniteScrollAction";
import { Badge } from "./ui/badge";
async function MainBlog() {
    const { message } = await fetchBlogsForInfinte(0, 1);
    const blog = message[0];


    return (
        <div className="bg-white max-w-xl mx-auto ">
            <Link href={`/blog/${blog.title.toLowerCase().split(" ").join("-")}-${blog.id}`} >
            {blog && (
                <div className="flex flex-col ">
                    <div className="relative w-[500px] h-[300px]">
                        <Image
                            src={blog.image || "/placeholder.svg"}
                            alt={blog.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-2xl border "
                        />
                            <Badge className="absolute bottom-2 left-2 bg-black"> {blog.tags[0].toLowerCase()}</Badge>
                        
                    </div>
                    <h2 className="text-xl font-bold font-sans tracking-tight w-[500px] leading-tight">
                        {blog.title}
                    </h2>

                    <div className="flex items-center space-x-2 mb-2 w-[500px]">
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
    );
}

export default MainBlog;
