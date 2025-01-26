import React from 'react'
import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
function CommentSectionBlog() {
  return (
      <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
          <Avatar>
              <AvatarImage src={comment.author.image} alt={comment.author.name} />
              <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
              <div className="flex items-center justify-between">
                  <p className="font-semibold">{comment.author.name}</p>
                  <p className="text-sm text-gray-500">
                      {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                  </p>
              </div>
              <p className="mt-1">{comment.content}</p>
              <div className="mt-2 flex items-center">
                  <Button variant="ghost" size="sm" onClick={handleLike} className="text-gray-500 hover:text-gray-700">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {likes}
                  </Button>
              </div>
          </div>
      </div>
  )
}

export default CommentSectionBlog
