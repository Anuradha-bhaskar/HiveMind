"use client"
import { getYourBlogs } from '@/actions/blogAction'
import React, { useState, useEffect } from 'react';
import YourAndSavedBlog from './YourAndSavedBlog';

function YourBlogs({ userId }) {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchB = async () => {
      setIsLoading(true);


      try {
        const result = await getYourBlogs(userId);
        if (result.success) {
          setBlogs(result.message);
        } else {
          console.log("blogs fail");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false); // Ensure it always runs
      }
    };

    fetchB();
  }, []);


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
        No blogs
      </div>
    );
  }
  return (
    <div className="h-[350px] overflow-y-auto">
      {blogs && blogs.map((blog) => (
        <YourAndSavedBlog
          key={blog.id}
          image={blog.image}
          title={blog.title}
          createdAt={blog.createdAt}
          tag={blog.tags[0]}
          id={blog.id}
          content={blog.content}
        />
      ))}
    </div>
  );
}

export default YourBlogs;
