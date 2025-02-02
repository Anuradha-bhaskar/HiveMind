"use client"

import React, { useState, useEffect } from 'react';
import YourAndSavedBlog from './YourAndSavedBlog';
import { getSavedBlog } from '@/actions/savedBlogsActions';

function YourBlogs({ userId }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchB = async () => {
      const result = await getSavedBlog(userId);
      if (result.success) {
        setBlogs(result.data);
        
      } else {
        console.log("blogs fail");
      }
    };
    fetchB();
  }, []);

  return (
    <div className="h-[350px] overflow-y-auto">
      {blogs && blogs.map((data) => (
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
