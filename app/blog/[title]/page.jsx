import React from 'react'
import BlogHeader from '@/components/BlogHeader'
import AuthorInBlog from '@/components/AuthorInBlog'

import BlogComment from '@/components/BlogComment'
import { getBlogById } from '@/actions/blogAction'
import ImageAndBlog from '@/components/ImageAndBlog'
import CommentSectionBlog from '@/components/CommentSectionBlog'
async function page({ params }) {
  const route = params.title
  const arrayOfRoute = route.split(`-`)
  const blogId = arrayOfRoute[arrayOfRoute.length - 1]
  console.log("Blog id will be : ", arrayOfRoute[arrayOfRoute.length - 1])
  const result = await getBlogById(blogId)
  if (!result.success) { 
    return <div> No blog found</div>
  }
const blogData=result.message
  const {id,authorId,title, content,image,updatedAt,tags} = blogData
  console.log("Blog data splited:", { id, authorId, title, content, image, updatedAt, tags })
  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-full max-w-4xl px-4 py-8 bg-white ">

        <BlogHeader
          title={title}
          tags={tags}
          dateOfPublished="March 15, 2024"
        />
        <AuthorInBlog  authorId={authorId}/>
        <ImageAndBlog imageUrl={image} blog={content} />
        <BlogComment authorId={authorId} blogId={id} />
        <CommentSectionBlog blogId={id} />
      </div>
    </div>

  )
}

export default page
