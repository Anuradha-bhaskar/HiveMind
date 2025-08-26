"use client"
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchBlogsForInfinte } from "@/actions/infiniteScrollAction";
import MainPageBlogComp from "./MainPageBlogComp";


function LoaderBlog() {
    const { ref, inView } = useInView();
    const [blogs, setBlogs] = useState([]);
    const [hasMoreBlogs, setHasMoreBlogs] = useState(true);  
    const [limit, setLimit] = useState(5); 
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        if (inView && hasMoreBlogs && !isLoading) {
            setIsLoading(true);
            const fetchBlog = async () => {
                const { message } = await fetchBlogsForInfinte(4, limit);
                if (!message || message.length === 0) {
                    setHasMoreBlogs(false);
                    setIsLoading(false);
                    return;
                }

                
                const newBlogs = message.filter(
                    (newBlog) => !blogs.some((blog) => blog.id === newBlog.id)
                );

                setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);  
                setLimit((prevLimit) => prevLimit + 5); 
                setIsLoading(false); 
            };

            fetchBlog();
        }
    }, [inView, hasMoreBlogs, limit, isLoading, blogs]); 

    return (
        <div className="px-10">
            
            <div className="flex flex-col space-y-6 justify-center items-center w-full" ref={ref}>

                
                {blogs && blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <MainPageBlogComp
                            key={blog.id}
                            title={blog.title}
                            image={blog.image}
                            createdAt={blog.createdAt}
                            content={blog.content}
                            id={blog.id}
                            tag={blog.tags[0]}
                            className="w-full max-w-4xl p-4 md:p-6 rounded-lg shadow-sm"
                        />
                    ))
                ) : (
                    !isLoading && <div className="mt-4 text-gray-500">No more blogs</div> 
                )}

                {isLoading && (
                    <div className="flex space-x-2 justify-center items-center mt-4">
                        <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-black rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-3 h-3 bg-black rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                )}
            </div>
        </div>

    );
}

export default LoaderBlog;
