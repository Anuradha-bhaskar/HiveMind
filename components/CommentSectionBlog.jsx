"use client"
import React from 'react'
import { useState,useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp } from "lucide-react"
import { getComments } from '@/actions/blogAction'
import { formatDistanceToNow } from "date-fns"
function CommentSectionBlog({ blogId }) {
    const [comments,setComments]=useState([])
    console.log("Blog iD in commetn section : ", blogId)
     
    useEffect(() => {
        const fetchComments = async () => {
            const result = await getComments(blogId)
            if (result.success) {
                console.log("Comments data:", result.message)
                setComments(result.message)
            } else {
                console.log("Error:", result.message)
            }
        }
        fetchComments()
    },[])
    return (
        <div>
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Comments</h2>
                {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <Avatar>
                            <AvatarImage src={comment.author.image} alt={comment.author.name} />
                            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">{comment.author.name}</p>
                                <p className="text-sm text-gray-500">
                                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}

                                </p>
                            </div>
                            <p className="mt-1">{comment.content}</p>
                            <div className="mt-2 flex items-center">
                                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    0
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    
    //   <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
    //       <Avatar>
    //           <AvatarImage src={comment.author.image} alt={comment.author.name} />
    //           <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
    //       </Avatar>
    //       <div className="flex-grow">
    //           <div className="flex items-center justify-between">
    //               <p className="font-semibold">{comment.author.name}</p>
    //               <p className="text-sm text-gray-500">
    //                   {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
    //               </p>
    //           </div>
    //           <p className="mt-1">{comment.content}</p>2
    //           <div className="mt-2 flex items-center">
    //               <Button variant="ghost" size="sm" onClick={handleLike} className="text-gray-500 hover:text-gray-700">
    //                   <ThumbsUp className="h-4 w-4 mr-1" />
    //                   {likes}
    //               </Button>
    //           </div>
    //       </div>
    //   </div>
  )
}

export default CommentSectionBlog
