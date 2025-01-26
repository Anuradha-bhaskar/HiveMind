import React from 'react'
import BlogHeader from '@/components/BlogHeader'
import AuthorInBlog from '@/components/AuthorInBlog'

import BlogComment from '@/components/BlogComment'
import { getBlogById } from '@/actions/blogAction'
import ImageAndBlog from '@/components/ImageAndBlog'
async function page() {
    
     console.log("Inside the blog layout")
         const result = await getBlogById("cm69801os0001bqeklbdrnyvc")
         if (result.success) {
             console.log("Blog Data:", result.message)
         } else {
             console.log("Error:", result.message)
         }
  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-full max-w-4xl px-4 py-8 bg-white ">
        <BlogHeader
          title="Building Beautiful React Components with Tailwind CSS"
          tags={["React", "Tailwind CSS", "Web Development", "Frontend", "UI Design"]}
          dateOfPublished="March 15, 2024"
        />
        <AuthorInBlog authorId={"cm66qa3m50004bqo0ied8iogq"} />
        <ImageAndBlog imageUrl={result.message.image} blog={result.message.content} />
        <BlogComment />
        {/* Show all comments here */}
      </div>
    </div>

  )
}

export default page
