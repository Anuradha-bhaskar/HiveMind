import React from 'react'
import { fetchBlogsForInfinte } from '@/actions/infiniteScrollAction';
import SideIndividualBlog from './SideIndividualBlog';
 async function BlogSideSection() {
    const { message } = await fetchBlogsForInfinte(1, 3);
     const blogs = message;
  return (
      <div className="bg-white max-w-xl ">
     
          {blogs && blogs.map((blog) => (
              
                  <SideIndividualBlog key={blog.id} imageUrl={blog.image} title={blog.title} date={blog.createdAt} tag={blog.tags[0]} id={blog.id} />
                  
         

          ))}
    </div>
  )
}

export default BlogSideSection
