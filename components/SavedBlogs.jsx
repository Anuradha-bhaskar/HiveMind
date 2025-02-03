"use client";
import React, { useState, useEffect } from "react";
import YourAndSavedBlog from "./YourAndSavedBlog";
import { getSavedBlog } from "@/actions/savedBlogsActions";

function YourBlogs({ userId }) {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const result = await getSavedBlog(userId);
        if (result.success) {
          setBlogs(result.data);
        } else {
          console.log("blogs fail");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false); // Ensure it always runs
      }
    };

    fetchBlogs();
  }, [userId]); // Include userId in dependencies

  if (isLoading) {
    return (
      
        <div className="flex mt-32 justify-center h-screen bg-white">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        No Saved Blogs
      </div>
    );
  }

  return (
    <div className="h-[350px] overflow-y-auto">
      {blogs.map((data) => (
        <YourAndSavedBlog
          key={data.blog.id}
          image={data.blog.image}
          title={data.blog.title}
          createdAt={data.blog.createdAt}
          tag={data.blog.tags[0]}
          id={data.blog.id}
          content={data.blog.content}
        />
      ))}
    </div>
  );
}

export default YourBlogs;
