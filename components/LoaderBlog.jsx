"use client"
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchBlogsForInfinte } from "@/actions/infiniteScrollAction";

function LoaderBlog() {
    const { ref, inView } = useInView();
    const [blogs, setBlogs] = useState([]);
    const [hasMoreBlogs, setHasMoreBlogs] = useState(true);  // Track if there are more blogs
    const [limit, setLimit] = useState(5); // Track the limit using useState
    const [isLoading, setIsLoading] = useState(false); // Track loading state

    useEffect(() => {
        if (inView && hasMoreBlogs && !isLoading) {
            setIsLoading(true); // Set loading state to true when fetching starts
            const fetchBlog = async () => {
                const { message } = await fetchBlogsForInfinte(4, limit);
                if (!message || message.length === 0) {
                    setHasMoreBlogs(false); // No more blogs
                    setIsLoading(false); // Stop loading
                    return;
                }

                // Remove any duplicate blogs based on `id`
                const newBlogs = message.filter(
                    (newBlog) => !blogs.some((blog) => blog.id === newBlog.id)
                );

                setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);  // Append new blogs
                setLimit((prevLimit) => prevLimit + 5); // Increase limit by 5
                setIsLoading(false); // Stop loading after fetching
            };

            fetchBlog();
        }
    }, [inView, hasMoreBlogs, limit, isLoading, blogs]); // Re-run effect when inView, hasMoreBlogs, limit, or isLoading change

    return (
        <div className="flex space-x-2 justify-center items-center h-40" ref={ref}>
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <div key={blog.id}>Hello</div> // Render your blog component here
                ))
            ) : (
                <div>No more blogs</div> // Show message if no blogs available
            )}

            {/* Loader animation */}
            {isLoading && (
                <>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </>
            )}
        </div>
    );
}

export default LoaderBlog;
