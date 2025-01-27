"use client"
import React from 'react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { postComments } from '@/actions/blogAction'
import { useRouter } from "next/router";
import toast from 'react-hot-toast'
function BlogComment({ authorId, blogId }) {
  
    console.log("Author id and blog id in blog comment:", { authorId, blogId })
    const [comment, setComment] = useState('');
    

const handlePostComment = async (e) => {
    e.preventDefault();
    try {
        const result = await postComments({ authorId, blogId, comment });
        
        if(result.success) {
            toast.success(result.message);
            window.location.reload();
        } else {
            toast.error(result.message);
        }
    } catch (error) {
        console.error("Something went wrong while posting comment in blogComment :", error);
    }finally{
        setComment('');
    }
}
  return (
      <div>
          <div className="space-y-6">
              <h2 className="text-2xl font-bold">Comments</h2>
              <form  className="space-y-4">
                  <div className="flex items-start space-x-4">
                      <div className="flex-grow">
                          <Textarea
                              placeholder="Write a comment..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="w-full min-h-[100px] resize-none"
                          />
                      </div>
                  </div>
                  <div className="flex justify-end">
                      <Button type="submit" className={`${!comment ? "opacity-50 cursor-not-allowed" : ""
                          } text-white py-2 px-4 rounded`}
                          disabled={!comment} onClick={(e)=>handlePostComment(e)}>
                          Post Comment
                      </Button>
                  </div>
              </form>
          </div>
      </div>
  )
}

export default BlogComment
