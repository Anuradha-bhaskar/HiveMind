import React from 'react';
import { fetchBlogsForInfinte } from '@/actions/infiniteScrollAction';
import SideIndividualBlog from './SideIndividualBlog';

async function BlogSideSection() {
  const response = await fetchBlogsForInfinte(1, 3);
  const blogs = Array.isArray(response?.message) ? response.message : [];

  return (
    <div className="bg-white max-w-xl">
      {blogs.length > 0 && (
        blogs.map((blog) => (
          <SideIndividualBlog
            key={blog.id}
            imageUrl={blog.image}
            title={blog.title}
            date={blog.createdAt}
            tag={blog.tags?.[0]}
            id={blog.id}
          />
        ))
      ) }
    </div>
  );
}

export default BlogSideSection;
