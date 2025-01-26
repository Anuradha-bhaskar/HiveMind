import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'    
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
function BlogComment({ authorId, blogId }) {

  return (
      <div>
          <div className="space-y-6">
              <h2 className="text-2xl font-bold">Comments</h2>
              <form  className="space-y-4">
                  <div className="flex items-start space-x-4">
                      <Avatar>
                          <AvatarImage src={'HHDLKS'} alt={"Namee"} />

                      </Avatar>
                      <div className="flex-grow">
                          <Textarea
                              placeholder="Write a comment..."
                            //   value={comment}
                            //   onChange={(e) => setComment(e.target.value)}
                              className="w-full min-h-[100px] resize-none"
                          />
                      </div>
                  </div>
                  <div className="flex justify-end">
                      <Button type="submit" >
                          Post Comment
                      </Button>
                  </div>
              </form>
          </div>
      </div>
  )
}

export default BlogComment
