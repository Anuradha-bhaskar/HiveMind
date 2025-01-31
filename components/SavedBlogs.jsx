import React from 'react'
import { getSavedBlog } from '@/actions/savedBlogsActions'
function SavedBlogs({ userId }) {
     
  return (
    <div>
          Saved Blogs component
          {userId}
    </div>
  )
}

export default SavedBlogs
