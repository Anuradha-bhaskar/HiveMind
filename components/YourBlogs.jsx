"use client"
import { getYourBlogs } from '@/actions/blogAction'
import React, { useState, useEffect } from 'react';
import YourAndSavedBlog from './YourAndSavedBlog';

function YourBlogs({ userId }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchB = async () => {
      const result = await getYourBlogs(userId);
      if (result.success) {
        setBlogs(result.message);
      } else {
        console.log("blogs fail");
      }
    };
    fetchB();
  }, []);

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
